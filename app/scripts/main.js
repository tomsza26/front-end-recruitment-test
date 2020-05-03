/* eslint-disable require-jsdoc */
/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                    'service worker became redundant.');

              default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  // Task 1 - Bacon onClick
  if (document.getElementById('addBacon')) {
    document.getElementById('addBacon').addEventListener('click', () => {
      document.getElementById('baconCont').innerHTML +=
        document.querySelector('img[alt="Bacon"]').outerHTML;
    });
  }

  // Task 2 - Styling, Task 3 - Submitting

  if (document.getElementById('formQuestion')) {
    document.getElementById('formQuestion').addEventListener('click', () => {
      document.querySelector('#popupFormId').classList.toggle('bshow');
    });
  }

  if (document.getElementById('formSubmit')) {
    document.getElementById('formSubmit').addEventListener('click', () => {
      event.preventDefault();
      const formName = document.getElementById('formName').checkValidity();
      const formSurname = document.getElementById('formSurname').checkValidity();
      const formEmail = document.getElementById('formEmail').checkValidity();
      const formPost = document.getElementById('formPost').checkValidity();
      const formTel = document.getElementById('formTel').checkValidity();
      const formCard = document.getElementById('formCard').checkValidity();
      const formCode = document.getElementById('formCode').checkValidity();
      const formExp = document.getElementById('formExp').checkValidity();

      const momentOfTruth = [formName, formSurname, formEmail, formPost, formTel, formCard, formCode, formExp];
      if (momentOfTruth.every((v)=> v === true)) {
        alert('Form Submitted!');
      } else {
        alert('Values in form are not valid!');
      }
    });

    function setInputFilter(textbox, inputFilter) {
      ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
        textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty('oldValue')) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            this.value = '';
          }
        });
      });
    }

    function cc_format(value) {
      if (value.length > 0 && value.length < 5 ) {
        const cutted = value.substring(0, 2);
        if (value[0] === '4') {
          document.getElementById('formCardImg').src = '../images/cards/visa.png';
        } else if ((value.length > 1) && (cutted === '34' || cutted === '37')) {
          document.getElementById('formCardImg').src = '../images/cards/american-express.png';
        } else if (value.length > 1) {
          const testVal1 = parseInt(cutted);
          if (testVal1 > 50 && testVal1 < 56) {
            document.getElementById('formCardImg').src = '../images/cards/mastercard.png';
          } else if (value.length>3) {
            const testVal2 = parseInt(value.substring(0, 4));
            if (testVal2 > 2220 && testVal2 < 2721) {
              document.getElementById('formCardImg').src = '../images/cards/mastercard.png';
            }
          }
        } else {
          document.getElementById('formCardImg').src = 'data:,';
        }
      } else if (value.length === 0) {
        document.getElementById('formCardImg').src = '../images/cards/visa.png';
      }

      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = matches && matches[0] || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        return parts.join(' — ');
      } else {
        return value;
      }
    }

    function date_format(value) {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{2,4}/g);
      const match = matches && matches[0] || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 2) {
        parts.push(match.substring(i, i + 2));
      }
      if (parts.length) {
        return parts.join(' / ');
      } else {
        return value;
      }
    }

    setInputFilter(document.getElementById('formName'), function(value) {
      return /^[a-z]*$/i.test(value);
    });

    setInputFilter(document.getElementById('formSurname'), function(value) {
      return /^[a-z]*$/i.test(value);
    });

    setInputFilter(document.getElementById('formEmail'), function(value) {
      return /^[a-zA-Z0-9@.]*$/i.test(value);
    });

    setInputFilter(document.getElementById('formTel'), function(value) {
      return /^[0-9\(\).-\s]*$/i.test(value);
    });

    setInputFilter(document.getElementById('formPost'), function(value) {
      return /^[0-9-]*$/i.test(value);
    });

    setInputFilter(document.getElementById('formCode'), function(value) {
      return /^[0-9-]*$/i.test(value);
    });

    document.getElementById('formCard').oninput = function() {
      this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
      this.value = cc_format(this.value);
    };

    document.getElementById('formExp').oninput = function() {
      this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
      this.value = date_format(this.value);
    };
  }
})();
