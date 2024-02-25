import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

function List(props) {
  const {item} = props;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'space-between',
        paddingVertical: 19,
        paddingHorizontal: 13,
        borderColor: '#EFEFEF',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      }}
      onPress={props.onPress}>
      <CardContent
        key1={'City Name'}
        value1={item?.cityName}
        key2={'City Code'}
        value2={item?.cityCode}
        isSelected={item?.isSelected}
      />

      <CardContent
        key1={'Country Name'}
        value1={item?.countryName}
        key2={'Airport Name'}
        value2={item?.airportName}
        isSelected={item?.isSelected}
      />
      <CardContent
        key1={'Airport Code'}
        value1={item?.airportCode}
        key2={'Terminal'}
        value2={item?.terminal}
        isSelected={item?.isSelected}
      />

      {/* {item.isSelected && <Text>Selected</Text>} */}
    </TouchableOpacity>
  );
}

export default List;

const CardContent = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
      {/* {item?.isSimFacility !== 1 && <SIMIcon style={{ marginRight: 5 }} />} */}
      <View style={{flexDirection: 'row', marginBottom: 3}}>
        <Text
          style={{
            fontWeight: 'normal',
            color: '#3D3D3D',
          }}>
          {props.key1}:
        </Text>
        <Text
          style={[
            {fontWeight: 600},
            props.isSelected ? {color: 'purple'} : {},
          ]}>
          {' '}
          {props?.value1}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 3}}>
        <Text
          style={{
            fontWeight: 'normal',
            color: '#3D3D3D',
          }}>
          {props.key2}:
        </Text>
        <Text
          style={[
            {fontWeight: 600},
            props.isSelected ? {color: 'purple'} : {},
          ]}>
          {' '}
          {props?.value2}
        </Text>
      </View>
    </View>
  );
};

const FlightCard = ({
  outerIndex,
  flight,
  flightBooked = {},
  onPressFlightCard = () => null,
}) => {
  return (
    <View
      style={[
        styles.card,
        flightBooked[outerIndex] ? {shadowColor: 'purple'} : {},
      ]}>
      <Text style={styles.headerText}>{flight?.airline}</Text>

      <Text style={styles.detailText}>
        From: {flight?.displayData?.source?.airport?.airportName}
      </Text>
      <Text style={styles.detailText}>
        To: {flight?.displayData?.destination?.airport?.airportName}
      </Text>
      <Text style={styles.detailText}>
        Departure: {flight?.displayData?.source?.depTime}
      </Text>
      <Text style={styles.detailText}>
        Arrival: {flight?.displayData?.destination?.arrTime}
      </Text>
      <Text style={styles.detailText}>Price: ${flight?.fare}</Text>
      <View style={styles.subsection}>
        <Text style={styles.subsectionHeader}>Available Airlines:</Text>
        {flight?.displayData?.airlines?.map((airline, index) => (
          <TouchableOpacity
            key={`flight-${index}`}
            onPress={onPressFlightCard}
            style={[
              styles.card2,
              flightBooked[outerIndex] ? {shadowColor: 'purple'} : {},
            ]}>
            <Text style={styles.headerText2}>{airline?.airlineName}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailText2}>Flight Number:</Text>
              <Text
                style={[
                  styles.detailText2,
                  flightBooked[outerIndex] ? {color: 'purple'} : {},
                ]}>
                {'  '}
                {airline?.flightNumber}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailText2}>Booking Status: </Text>
              <Text
                style={[
                  styles.detailText2,
                  flightBooked[outerIndex] ? {color: 'purple'} : {},
                ]}>
                {' '}
                {flightBooked[outerIndex] ? 'Booked' : 'Not Booked'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  subsection: {
    marginTop: 15,
  },
  subsectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subsectionText: {
    fontSize: 14,
    marginBottom: 3,
  },
  card2: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerText2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText2: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export {FlightCard};
