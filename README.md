# Firefox Fetch CORS with range header bug

Firefox bugzilla report: https://bugzilla.mozilla.org/show_bug.cgi?id=1762794

- [Steps to reproduce:](#steps-to-reproduce)
- [Actual results:](#actual-results)
- [Expected results:](#expected-results)

_**Below is the submitted bug report:**_

## Steps to reproduce:

I think I found a bug in the Fetch implementation in Firefox where the range header is not recognized as a CORS-safelisted request-header.

According to https://fetch.spec.whatwg.org/#cors-safelisted-request-header, `range` is considered a CORS-safelisted request-header if it is a simple range header value (https://fetch.spec.whatwg.org/#simple-range-header-value). E.g. `bytes=0-127` is a simple range header value.

> The relevant failing test-case on Web Platform Tests (wpt) is here: https://wpt.fyi/results/cors/cors-safelisted-request-header.any.html?label=experimental&label=master&aligned
>
> Source:
> + http://wpt.live/cors/cors-safelisted-request-header.any.js
> + https://github.com/web-platform-tests/wpt/blob/902e9dceb10d98a646ad77d46df62e0365626fff/cors/cors-safelisted-request-header.any.js

I have created a reduced test-case at https://dotnetcarpenter.github.io/bug-firefox-fetch-cors/.

1. Press the "Fetch" button and see the result under the "Result" label.
2. Use DevTools to see the error, "CORS Preflight Did Not Succeed".

Source code is at https://github.com/dotnetCarpenter/bug-firefox-fetch-cors.

```js
const url = 'https://raw.githubusercontent.com/OpenXcom/OpenXcom/94640aab1279ae268e0420a7b5c99cc44eb09473/bin/common/SoldierName/Danish.nam';

const appHtml     = document.querySelector ('#app');
const fetchButton = appHtml.querySelector ('#fetch');
const resultPre   = appHtml.querySelector ('#result');

fetchButton.addEventListener ('click', () => {
  fetch (url, {
    headers: {
      range: 'bytes=0-127'
    }
  }).then (response => {
      response.text ()
        .then (text => {
          resultPre.textContent = text;
        });
    })
    .catch (error => {
      resultPre.textContent = `Error: ${error.message}`;
    });
});
```


## Actual results:

1. Go to https://dotnetcarpenter.github.io/bug-firefox-fetch-cors/
2. Clicking the button will fetch the first 128 bytes from raw.githubusercontent.com/OpenXcom/OpenXcom/bin/common/SoldierName/Danish.nam, or in the case of Firefox 99.0b8 (64-bit), throw an error.


## Expected results:

In Chrome, you will get the following result (content of the &lt;pre&gt; element):

```
lookWeights:
  - 49
  - 49
  - 2
  - 0
maleFirst:
  - Absalon
  - Adam
  - Adolf
  - Albert
  - Alex
  - Alexander
  - Alf
  - A
```
_☝️ The first 128 bytes of https://raw.githubusercontent.com/OpenXcom/OpenXcom/94640aab1279ae268e0420a7b5c99cc44eb09473/bin/common/SoldierName/Danish.nam_