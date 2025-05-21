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

   const handleToday = () => {
    const today = utils.getToday();
    setMainState({ type: 'set', selectedDate: today });
    if (onDateChange) {
      onDateChange(today);
    }
  };

  const handleFullMonth = () => {
    if (!range) return;

    const activeDate = utils.getDate(mainState.activeDate);
    const firstDay = utils.startOfMonth(activeDate);
    const lastDay = utils.endOfMonth(activeDate);

    setMainState({ type: 'set', startDate: firstDay, endDate: lastDay });
    if (onDateChange) {
      onDateChange({ startDate: firstDay, endDate: lastDay });
    }
  };

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
      <View style={style.footContainer}>
        <TouchableOpacity onPress={handleToday} style={style.todayButton}>
          <Text style={style.todayText}>Hoje</Text>
        </TouchableOpacity>
        {range && (
          <TouchableOpacity onPress={handleFullMonth} style={style.fullMonthButton}>
            <Text style={style.fullMonthText}>Mês Inteiro</Text>
          </TouchableOpacity>
        )}
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
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
    },
    footContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    todayButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: 'transparent',
      marginRight: 8,
    },
    todayText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
    },
    fullMonthButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme.mainColor,
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
    fullMonthText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.selectedTextColor,
    },
  });

export {Calendar};
