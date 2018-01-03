var resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    var resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    var combinedOptions = Object.assign({}, options, { resolveString: resolveString });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };

    function doRandomiserEffect(options, callback) {
      var characters = options.characters;
      var timeout = options.timeout;
      var element = options.element;
      var partialString = options.partialString;

      var iterations = options.iterations;

      setTimeout(function () {
        if (iterations >= 0) {
          var nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      var resolveString = options.resolveString;
      var characters = options.characters;
      var offset = options.offset;
      var partialString = resolveString.substring(0, offset);
      var combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, function () {
        var nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  }

  /* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
   * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
   */
};var strings = ['Will Buyers has been captured again by the Demogorgon. ', 'But this Demogorgon likes number series a lot, yeah more than taming the world. ', 'So he gives Will 5 terms of a series and Will has to find out the 34th   term of the series, ', 'but Will has not been able to figure out the series. ', 'So help him out:-', 'Series - 1, 2, 5, 14, 42.'];

var counter = 0;

var options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 0.2,
  // Number of random characters to show
  iterations: 2,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]')

  // Callback function when resolve completes
};function callback() {
  setTimeout(function () {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    var nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);