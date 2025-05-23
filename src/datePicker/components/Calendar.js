import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';

import { Header } from './Header';
import { Days } from './Days';
import {useCalendar} from '../DatePicker';

const Calendar = () => {
  const {options, state, utils, onSelectedChange, range} = useCalendar();
  const [mainState, setMainState] = state;
  const style = styles(options);
  const [{shownAnimation}, changeMonthAnimation] = utils.useMonthAnimation(
    mainState.activeDate,
    options.daysAnimationDistance,
  );

  useEffect(() => {
    if (mainState.startDate && mainState.endDate) {
      onSelectedChange(`${mainState.startDate} ~ ${mainState.endDate}`);
    } else if (mainState.selectedDate) {
      onSelectedChange(mainState.selectedDate);
    }
  }, [
    mainState.selectedDate,
    mainState.startDate,
    mainState.endDate,
    onSelectedChange,
  ]);

  return (
    <View style={style.container}>
      <Header changeMonth={changeMonthAnimation} />
      <View style={[style.daysName, utils.flexDirection]}>
        {utils.config.dayNamesShort.map(item => (
          <Text key={item} style={style.daysNameText}>
            {item}
          </Text>
        ))}
      </View>
      <View style={style.daysContainer}>
        <Animated.View style={[style.days, shownAnimation]}>
          <Days />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    daysName: {
      paddingBottom: 10,
      marginBottom: 0,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderBottomColor: theme.borderColor,
      borderBottomWidth: 1,
      marginHorizontal: 15,
    },
    daysNameText: {
      fontFamily: theme.defaultFont,
      color: theme.textSecondaryColor,
      fontSize: theme.textFontSize,
    },
    daysContainer: {
      position: 'relative',
      overflow: 'hidden',
      margin: 15,
      marginTop: 5,
      marginBottom: 0,
      minHeight: 320
    },
    days: {
      width: '100%',
      height: '100%',
    },

  });

export {Calendar};
