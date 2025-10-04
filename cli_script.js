$(document).ready(function () {
  const $terminalBody = $('#terminalBody');

  function scrollToBottom() {
    $terminalBody.scrollTop($terminalBody.prop("scrollHeight"));
  }

  function focusUserInput() {
    const $inputs = $terminalBody.find('#userInput');
    const $lastInput = $inputs.last();
    if ($lastInput.length) $lastInput.focus();
  }

  function bindInput($userInput) {
    // Auto-grow textarea
    $userInput.on('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      scrollToBottom();
    });

    // Handle Enter
    $userInput.on('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const command = $userInput.val().trim();
        const response = processCommand(command);

        // Turn current input into static command history
        const $parent = $userInput.parent();
        $parent.html(`<span>user@project.com:~$ </span>${command}`);

        // Append response below
        if (response) {
          const $responseOutput = $('<div class="response-line"></div>');

          if (isHTML(response)) {
            // Render HTML directly
            $responseOutput.html(response);
            $parent.after($responseOutput);
            scrollToBottom();
          } else {
            // Type out text character by character
            $parent.after($responseOutput);
            animateTypeOut($responseOutput, response, scrollToBottom);
          }
        }

        // Add new prompt + input
        const $newLine = $(`
          <div class="command-line">
            <span>user@project.com:~$ </span>
            <textarea id="userInput" rows="1" autocomplete="off"></textarea>
          </div>
        `);
        $terminalBody.append($newLine);

        // Rebind listeners
        bindInput($newLine.find('#userInput'));

        // Scroll to bottom
        scrollToBottom();
      }
    });
  }

  function processCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'whois':
        return 'Hello! \nI am Soham Thummar, an Embedded Engineer and Programmer.';
      case 'about':
        return 'Hi, I’m Soham — passionate about creating smart systems where hardware meets software.\n' +
          'I’ve built projects using Arduino, ESP32, and Raspberry Pi, exploring IoT, robotics, and automation.\n' +
          'I enjoy solving real-world problems with technology, from coding in Python to experimenting with AI/ML on edge devices.\n' +
          'My vision is to become an expert in AI, Robotics, and IoT, contributing to future-ready tech.';
      case 'help':
        return 'Available commands:\nwhois\nabout\nhelp\ncontact\nclear\necho\neducation\nprojects';
      case 'contact':
        // Return HTML for clickable email
        return '<a style="color: #bfcdbc;" href="mailto:sohamthummar04@gmail.com">sohamthummar04@gmail.com</a>';
      case 'education':
        return 'B.Tech in Computer Engineering (CGPA 8.39) from RK University, Rajkot, Gujarat, India.';
      case 'clear':
        clearTerminal();
        return '';
      case 'ls':
        return 'Available commands:\nwhois\nabout\nhelp\ncontact\nclear\necho\neducation\nprojects';
      case 'projects':
        return '1. Python file organizer\n2. Void music';
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
    $terminalBody.html(`
      <div class="command-line">
        <span >user@project.com:~$ </span>
        <textarea id="userInput" rows="1" autocomplete="off"></textarea>
      </div>
    `);
    bindInput($terminalBody.find('#userInput'));
    focusUserInput();
    scrollToBottom();
  }

  function animateTypeOut($element, text, onEachChar) {
    $element.html('');
    let i = 0;

    function type() {
      if (i < text.length) {
        $element.html($element.html() + text.charAt(i));
        i++;
        if (onEachChar) onEachChar(); // auto-scroll while typing
        setTimeout(type, 30);
      }
    }
    type();
  }

  // Helper to detect if string is HTML
  function isHTML(str) {
    return /<[a-z][\s\S]*>/i.test(str);
  }

  // Init
  bindInput($('#userInput'));
  focusUserInput();
  scrollToBottom();
});

