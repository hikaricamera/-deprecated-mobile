import {Component} from "react";
import React from "react";
import {Text, TouchableOpacity} from "react-native";


class EditImageScreenBottomTool extends Component {

   render() {
      return (
         <TouchableOpacity style={[styles.container]}>
            <Text style={{fontSize: 30}}>Submit</Text>
         </TouchableOpacity>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
   }
};

export default EditImageScreenBottomTool;
