**Issue**

>Couldn't find preset "module:metro-react-native-babel-preset" relative to directory "/home/stanley/Documents/sides/hikari_cam_mobile"

**Solution**

When testing, in `.babelrc`, change to
        `{ "presets": ["react-native"] }`. 
Note that after testing, change it back to
        `{ "presets": ["module:metro-react-native-babel-preset"] }`

---

**Issue**

>Cannot find module 'AccessibilityInfo' (While processing preset: "/home/stanley/Documents/sides/hikari_cam_mobile/node_modules/react-native/Libraries/react-native/react-native-implementation.js")
  at Object.get AccessibilityInfo [as AccessibilityInfo] (node_modules/react-native/Libraries/react-native/react-native-implementation.js:22:12)
  at node_modules/lodash/_baseClone.js:163:23
  at arrayEach (node_modules/lodash/_arrayEach.js:15:9)
  at baseClone (node_modules/lodash/_baseClone.js:160:3)
  at cloneDeepWith (node_modules/lodash/cloneDeepWith.js:37:10)
  at OptionManager.mergeOptions (node_modules/babel-core/lib/transformation/file/options/option-manager.js:206:44)

**Solution**

See 'stackoverflow.com/questions/54163274/jest-test-fail-in-react-native'

---
**Issue**

Unresolved variable or type Jest

**Solution**

Install @type/jest

---
**Issue**

ScrollView doesn't show any content

**Solution**

Remove flex style from ScrollView styles

---
**Issue**

A problem occurred configuring project ':react-native-image-resizer'.
> Failed to install the following Android SDK packages as some licences have not been accepted.
     platforms;android-23 Android SDK Platform 23
  To build this project, accept the SDK license agreements and install the missing components using the Android Studio SDK Manager.
  Alternatively, to transfer the license agreements from one workstation to another, see http://d.android.com/r/studio-ui/export-licenses.html

**Solution**

https://stackoverflow.com/questions/44099985/run-android-does-not-run-due-to-not-accepted-license-agreements

---
**Issue**
undefined is not an object (evaluating `React.ReactPropTypes.oneOf`)

**Solution**

Don't import `{ReactPropTypes}` from `react`

---
**Issue**
```
<ReboundScrollView>
    <View>
        <Text>123</Text>
        <Text>123</Text>
    </View>
</ReboundScrollView>
```

Gives error "ScrollView can only host one direct child"

**Solution**

Add `collapsable={false}` to the <View>

---
**Issue**

The screen is blank but it shouldn't be

Solution:
1. Look out for `flex:1`

---
**Issue**

The touchable component is drawn over another touchable
component, but the touchable component on top does not get
the `onPress` event.

Here is a snippet:
```
<View style={{backgroundColor: 'transparent',
         position: 'absolute',
         top: 0,
         left: 0,
         paddingTop: 0,
         borderBottomWidth: 0,
         height: 40,
         width: 400}}>
      <View style={ {
         position: 'absolute',
         flexDirection: 'column',
         top: 121,
         right: 200,
         backgroundColor: 'blue',
      }}>
          <TouchableOpacity style={{
             width: 50, height: 40
          }}>
              <Text>All Photos</Text>
          </TouchableOpacity>
      </View>
</View>
```

**Solution**
