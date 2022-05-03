//All scripts
@@include('_dependentLibs.js')

'use strict';
//configs
@@include('configs/_keyboardBacklight.js')
@@include('configs/_lessons.js')

//modules
@@include('modules/_debugger.js')
@@include('modules/_keyboardLayout.js')
@@include('modules/_keyboardLesson.js')
@@include('main_js/_keyboardEngine.js')
@@include('modules/_stopwatch.js')

//Main scripts

@@include('main_js/_settingsControl.js')
@@include('main_js/_lessonscontrol.js')
@@include('main_js/_musicControl.js')
@@include('main_js/_themecontrol.js')

@@include('tiltSettings/_tiltSettings.js')
@@include('chartJsSettings/_chartJs.js');

//main_js/storingInfo.js?
@@include('main_js/_languageChoose.js')

//OnStart scripts
@@include('_onstart.js')
