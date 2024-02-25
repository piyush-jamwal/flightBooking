import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import profile from './assets/profile.jpg';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomSelectField from './molecules/Selectable';
import {colors} from './styles';
import List, {FlightCard} from './molecules/List';
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import {useStore} from './store/store';
import ChevronDown from './assets/ChevronDown.svg';
import CloseIcon from './assets/Close-Icon.svg';
import ImgSource from './assets/profile.jpg';
function Booking1() {
  const [data, setData] = React.useState([]);
  const {state, dispatch} = useStore();
  const [selected, setSelected] = React.useState(0);
  const [sliderValue, setSlider] = React.useState(0);
  const [information, setInformation] = React.useState({
    uniqueSourceList: [], // this is the list of sources that the user can select
    uniqueDestinationList: [], // this is the list of destinations that the user can select
    uniqueAirlines: [], // this is the list of airlines that the user can select
    bookedFlights: {}, // this is the list of flights that the user has booked
  });
  const [boardingPoint, setBoardingPoint] = React.useState('');
  const [selectedAirports, setSelectedAirports] = React.useState({
    source: {},
    destination: {},
  });

  useEffect(() => {
    const sourceDictionary = {};
    const airlinesDictionary = {};
    const destinationDictionary = {};
    const uniqueSourceList = [];
    const uniqueAirlines = [];
    const uniqueDestinationList = [];
    fetch('https://api.npoint.io/4829d4ab0e96bfab50e7')
      .then(res => {
        return res.json();
      })
      .then(res => {
        res?.data?.result?.forEach(element => {
          if (
            sourceDictionary[element?.displayData?.source?.airport?.airportCode]
          ) {
          } else {
            sourceDictionary[
              element?.displayData?.source?.airport?.airportCode
            ] = true;
            uniqueSourceList.push({
              ...element?.displayData?.source?.airport,
              isSelected: false,
            });
          }
          if (
            destinationDictionary[
              element?.displayData?.destination?.airport?.airportCode
            ]
          ) {
          } else {
            destinationDictionary[
              element?.displayData?.destination?.airport?.airportCode
            ] = true;
            uniqueDestinationList.push({
              ...element?.displayData?.destination?.airport,
              isSelected: false,
            });
          }
          element?.displayData?.airlines?.forEach(airlines => {
            if (airlinesDictionary[airlines?.airlineCode]) {
            } else {
              airlinesDictionary[airlines?.airlineCode] = true;
              uniqueAirlines.push({...airlines, isSelected: false});
            }
          });
        });
        setInformation({
          ...information,
          uniqueSourceList: uniqueSourceList,
          uniqueAirlines: uniqueAirlines,
          uniqueDestinationList: uniqueDestinationList,
        });

        return setData(res?.data?.result);
      })
      .catch(err => {
        console.log('error', err);
      });
  }, []);

  const bottomSheetModalRef = useRef(null);
  const filterSource = information?.uniqueSourceList?.filter(item => {
    if (item?.cityName.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    if (item?.cityCode.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    if (item?.airportCode.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    if (item?.airportName.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    return false;
  });
  const filterDestination = information?.uniqueDestinationList?.filter(item => {
    if (item?.cityName.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    if (item?.cityCode.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    if (item?.airportCode.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    if (item?.airportName.toLowerCase().includes(boardingPoint.toLowerCase())) {
      return true;
    }
    return false;
  });

  const onPressFlightCard = useCallback(
    flightNumber => {
      const changedInformation = information?.bookedFlights;
      if (information?.bookedFlights[flightNumber]) {
        changedInformation[flightNumber] = !changedInformation[flightNumber];
      } else {
        changedInformation[flightNumber] = true;
      }

      setInformation({...information, bookedFlights: changedInformation});
      dispatch({type: 'BOOKED_FLIGHTS', payload: changedInformation});
    },
    [information],
  );
  const handlePress = (airportCode, index) => {
    if (selected) {
      const updatedData = filterDestination.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        } else {
          return {
            ...item,
            isSelected: false,
          };
        }
      });
      setInformation({
        ...information,
        uniqueDestinationList: updatedData,
      });
      setSelectedAirports({
        ...selectedAirports,
        destination: updatedData[index],
      });
    } else {
      const updatedData = filterSource.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        } else {
          return {
            ...item,
            isSelected: false,
          };
        }
      });
      setInformation({
        ...information,
        uniqueSourceList: updatedData,
      });
      setSelectedAirports({...selectedAirports, source: updatedData[index]});
    }
    setTimeout(() => {
      bottomSheetModalRef?.current?.close();
    }, 1000);
  };

  const keyExtractor = (item, index) => index.toString();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'purple'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: '5%',
          paddingHorizontal: '6%',
        }}>
        <Text style={{fontSize: 18, fontWeight: '800', color: '#FFF', flex: 1}}>
          Lets book your next flight here!
        </Text>

        <View style={{flex: 0.7, alignItems: 'flex-end'}}>
          <Image
            source={ImgSource}
            style={{height: 50, width: 50, borderRadius: 30}}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 40,
          paddingHorizontal: '6%',
          paddingVertical: '5%',
          paddingTop: '10%',
        }}>
        <CustomSelectField
          label="From"
          placeholder={
            selectedAirports.source?.isSelected
              ? `${selectedAirports.source?.cityName} (${selectedAirports.source?.airportName})`
              : 'Please select boarding point'
          }
          onPress={() => {
            setSelected(0);
            bottomSheetModalRef.current.open();
          }}
          rightAccessor={() => <ChevronDown />}
        />
        <CustomSelectField
          label="To"
          placeholder={
            selectedAirports.destination?.isSelected
              ? `${selectedAirports.destination?.cityName} (${selectedAirports.destination?.airportName})`
              : 'Please select destination'
          }
          onPress={() => {
            setSelected(1);
            bottomSheetModalRef.current.open();
          }}
          rightAccessor={() => <ChevronDown />}
        />

        <Text style={{fontWeight: '600', color: colors.lightBlack}}>
          Filters
        </Text>
        {information.uniqueAirlines?.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item?.airlineName}</Text>
              <CheckBox
                style={{marginBottom: 5}}
                value={item.isSelected}
                onValueChange={() => {
                  const updatedData = information.uniqueAirlines.map(
                    (airline, i) => {
                      if (i === index) {
                        return {
                          ...airline,
                          isSelected: !airline.isSelected,
                        };
                      } else {
                        return {
                          ...airline,
                          isSelected: false,
                        };
                      }
                    },
                  );
                  setInformation({
                    ...information,
                    uniqueAirlines: updatedData,
                  });
                }}
              />
            </View>
          );
        })}
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontWeight: '600',
              color: colors.lightBlack,
              marginBottom: 10,
            }}>
            Select Price Range
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Slider
                style={{width: '90%', height: 40}}
                onValueChange={value => setSlider(value)}
                minimumValue={0}
                step={100}
                maximumValue={10000}
                minimumTrackTintColor="purple"
                maximumTrackTintColor="#000000"
              />
            </View>
            <View style={{flex: 0.4}}>
              <Text style={{fontSize: 12, textAlign: 'right', color: 'purple'}}>
                $ {sliderValue.toString()}
              </Text>
            </View>
          </View>
        </View>
        {/* </View> */}
        <View style={{height: '50%'}}>
          <FlatList
            data={data
              .filter(item => {
                return item.displayData.airlines.some(airlines => {
                  return information.uniqueAirlines
                    .filter(airlines => airlines?.isSelected)
                    .map(airline => {
                      return airline.airlineCode;
                    })
                    .includes(airlines.airlineCode);
                });
              })
              .filter(item => {
                return item?.fare <= sliderValue;
              })
              .filter(item => {
                return (
                  item.displayData.source.airport.airportCode ===
                  selectedAirports.source?.airportCode
                );
              })
              .filter(item => {
                return (
                  item.displayData.destination.airport.airportCode ===
                  selectedAirports.destination?.airportCode
                );
              })}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            renderItem={({item, index}) => {
              return (
                <FlightCard
                  flight={item}
                  outerIndex={item?.id}
                  flightBooked={information?.bookedFlights}
                  onPressFlightCard={() => onPressFlightCard(item?.id)}
                />
              );
            }}
          />
        </View>
        <RBSheet
          ref={bottomSheetModalRef}
          height={800}
          openDuration={250}
          customStyles={{
            container: {
              borderRadius: 10,
              paddingTop: 20,
              padding: 10,
            },
          }}>
          <>
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginBottom: 20}}
              onPress={() => bottomSheetModalRef?.current?.close()}>
              <View style={{}}>
                <CloseIcon />
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="search flights here "
              value={boardingPoint}
              onChangeText={text => setBoardingPoint(text)}
              style={{
                width: '100%',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: colors.greyOne,
                padding: 10,
                backgroundColor: '#FFF',
              }}
            />

            <FlatList
              data={selected ? filterDestination : filterSource}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              renderItem={({item, index}) => (
                <List
                  item={item}
                  onPress={() => handlePress(item?.airportCode, index)}
                />
              )}
              keyExtractor={keyExtractor}
              contentContainerStyle={{width: '100%'}}
            />
          </>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
}

export default Booking1;
