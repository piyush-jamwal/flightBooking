import React from 'react';
import {Text, View, SafeAreaView, Image, FlatList} from 'react-native';
import {useStore} from './store/store';
import {FlightCard} from './molecules/List';
import ImgSource from './assets/profile.jpg';

function Booking2() {
  const {state, dispatch} = useStore();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('https://api.npoint.io/4829d4ab0e96bfab50e7')
      .then(res => {
        return res.json();
      })
      .then(res => {
        return setData(res?.data?.result);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'purple'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: '5%',
          paddingHorizontal: '6%',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800', color: '#FFF', flex: 1}}>
          Here are your booked tickets!
        </Text>
        <View style={{flex: 0.7}}>
          <View style={{flex: 0.7, alignItems: 'flex-end'}}>
            <Image
              source={ImgSource}
              style={{height: 50, width: 50, borderRadius: 30}}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 7,
          backgroundColor: 'white',
          borderRadius: 40,
          paddingHorizontal: '6%',
          paddingVertical: '5%',
          paddingTop: '10%',
        }}>
        <View style={{height: '95%'}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            renderItem={({item, index}) => {
              if (state.bookedFlights[index + 1]) {
                return (
                  <FlightCard
                    flight={item}
                    outerIndex={item?.id}
                    flightBooked={state?.bookedFlights}
                    // onPressFlightCard={() => onPressFlightCard(index)}
                  />
                );
              } else {
                {
                  <></>;
                }
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Booking2;
