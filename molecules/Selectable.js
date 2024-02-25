import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import * as color from '../styles/colors';
function CustomSelectField(props) {
  const {
    label = '',
    placeholder = '',
    onPress = () => {},
    leftAccessor = () => null,
    rightAccessor = () => null,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.fieldContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.placeholder}>{label}</Text>
          </View>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <View style={[styles.row, {flex: 1}]}>
              {leftAccessor()}
              <Text style={styles.label}>{placeholder}</Text>
            </View>
            <View>{rightAccessor()}</View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomSelectField;

const styles = StyleSheet.create({
  container: {marginBottom: 10},
  labelContainer: {marginBottom: 1},
  label: {fontWeight: '600', color: color.lightBlack, marginLeft: 7},
  fieldContainer: {
    borderColor: color.greyOne,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  row: {flexDirection: 'row'},
  placeholder: {marginLeft: 7, color: color.greyTwo},
});
