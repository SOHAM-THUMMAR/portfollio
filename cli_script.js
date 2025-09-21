document.addEventListener('DOMContentLoaded', function() {
  const terminalBody = document.getElementById('terminalBody');
  const output = document.querySelector('.output');

  function focusUserInput() {
    const inputs = terminalBody.querySelectorAll('#userInput');
    const lastInput = inputs[inputs.length - 1];
    if (lastInput) lastInput.focus();
  }

  function bindInput(userInput) {
    // Auto-grow textarea
    userInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });

    // Handle Enter
    userInput.addEventListener('keydown', function handler(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const command = userInput.value.trim();
        const response = processCommand(command);

        // Turn current input into static command history
        const parent = userInput.parentElement;
        parent.innerHTML = `<span>user@project.com:~$ </span>${command}`;

        // Append response immediately below
        if (response) {
          const responseOutput = document.createElement('div');
          responseOutput.classList.add('response-line');
          parent.insertAdjacentElement('afterend', responseOutput);
          animateTypeOut(responseOutput, response);
        }

        // Add new prompt + input
        const newLine = document.createElement('div');
        newLine.classList.add('command-line');
        newLine.innerHTML = `
          <span>user@project.com:~$ </span>
          <textarea id="userInput" rows="1" autocomplete="off"></textarea>
        `;
        terminalBody.appendChild(newLine);

        // Rebind listeners for new input
        bindInput(newLine.querySelector('#userInput'));

        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  function processCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'whois':
        return 'Hellow! \nI am Soham Thummar, An Emedded Engineer and a Programmer.';
      case 'about':
        return '      Hi, I’m Soham — passionate about creating smart systems where hardware meets software. ' +
       'I’ve built projects using Arduino, ESP32, and Raspberry Pi, exploring areas like IoT, robotics, and automation. ' +
       'I enjoy solving real-world problems with technology, whether it’s designing embedded circuits, coding in Python, or experimenting with AI/ML on edge devices. ' +
       'My long-term vision is to become an expert in AI, Robotics, and IoT, and contribute to building future-ready technologies that make life easier and smarter.';

       case 'help':
        return 'Types of commands:\nwhois\nhelp\nabout\ncontact\nclear\necho\neducation';
      case 'contact':
        return 'You can reach me via email at "sohamthummar04@gmail.com".';
      case 'education':
        return 'B.Tech in Computer Engineering with 8.39 CGPA from RK University Rajkot, Gujarat, India.';
      case 'clear':
        clearTerminal();
        return '';
      case '':
        return '';
      default:
        if (cmd.startsWith('echo ')) {
          return cmd.substring(5);
        }
        return `Command not found: ${command}`;
    }
  }

  function clearTerminal() {
    terminalBody.innerHTML = `
      <div class="command-line">
        <span>user@project.com:~$ </span>
        <textarea id="userInput" rows="1" autocomplete="off"></textarea>
      </div>
    `;
    bindInput(terminalBody.querySelector('#userInput'));
    focusUserInput();
  }

  function animateTypeOut(element, text) {
    element.innerHTML = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        let currentChar = text.charAt(i);
        if (currentChar === '<') {
          const endTagIndex = text.indexOf('>', i);
          if (endTagIndex !== -1) {
            element.innerHTML += text.substring(i, endTagIndex + 1);
            i = endTagIndex + 1;
          }
        } else {
          element.innerHTML += currentChar;
          i++;
        }
        setTimeout(type, 30);
      }
    }
    type();
  }

  // Bind first input
  bindInput(document.getElementById('userInput'));
  focusUserInput();
});
