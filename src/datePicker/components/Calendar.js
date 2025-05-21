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

  const handlePastMonth = () => {
    if (!range) return;

    const activeDate = utils.getDate(mainState.activeDate);

    const pastMonth = utils.addMonths(activeDate, -1); 
    const firstDay = utils.startOfMonth(pastMonth);
    const lastDay = utils.endOfMonth(pastMonth);

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
          <View style={style.footContainer}>
            <TouchableOpacity onPress={handleToday} style={style.todayButton}>
              <Text style={style.todayText}>Hoje</Text>
            </TouchableOpacity>
            {range && (
              <>
                <TouchableOpacity onPress={handleFullMonth} style={style.todayButton}>
                  <Text style={style.todayText}>Mês Inteiro</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePastMonth} style={style.todayButton}>
                  <Text style={style.todayText}>Mês Passado</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
      position: 'absolute',
      width: '100%',
      height: '85%',
      top: 0,
      right: 0,
    },
    footContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      minHeight: 50
    },
    todayButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: 'transparent',
      marginRight: 8,
      borderWidth: 1,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    todayText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
    },

  });

export {Calendar};
