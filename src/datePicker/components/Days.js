import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useCalendar} from '../DatePicker';

const Days = () => {
  const {options, state, utils, onDateChange, range} = useCalendar();
  const [mainState, setMainState] = state;
  const [itemSize, setItemSize] = useState(0);
  const style = styles(options);
  const days = useMemo(() => utils.getMonthDays(mainState.activeDate));

  
  const onSelectDay = date => {
    if (!range) {
      setMainState({ type: 'set', selectedDate: date });
      onDateChange(utils.getFormated(utils.getDate(date), 'dateFormat'));
      return;
    }
  
    const { startDate, endDate } = mainState;
  
    if (!startDate || (startDate && endDate)) {
      setMainState({ type: 'set', startDate: date, endDate: '' });
      onDateChange(date);
    } else if (startDate && !endDate) {
      if (utils.compareDates(date, startDate) >= 0) {
        setMainState({ type: 'set', startDate, endDate: date });
        onDateChange(date);
      } else {
        setMainState({ type: 'set', startDate: date, endDate: '' });
        onDateChange(date);
      }
    }
  };
  const changeItemHeight = ({nativeEvent}) => {
    const {width} = nativeEvent.layout;
    !itemSize && setItemSize((width / 7).toFixed(2) * 1 - 0.5);
  };

  return (
    <View style={[style.container, utils.flexDirection]} onLayout={changeItemHeight}>
    {days.map((day, n) => {
      const isSelected = mainState.selectedDate === day?.date;
      const isInRange =
        mainState.startDate &&
        mainState.endDate &&
        utils.isDateBetween(day?.date, mainState.startDate, mainState.endDate);
      const isRangeStart = mainState.startDate === day?.date;
      const isRangeEnd = mainState.endDate === day?.date;

      return (
        <View
          key={n}
          style={{
            width: itemSize,
            height: itemSize,
          }}>
          {day && (
            <TouchableOpacity
              style={[
                style.dayItem,
                {
                  borderRadius: range ? 0 : itemSize / 2,
                },
                (isSelected || isInRange || isRangeStart || isRangeEnd) && style.dayItemSelected,
              ]}
              onPress={() => !day.disabled && onSelectDay(day.date)}
              activeOpacity={0.8}>
              <Text
                style={[
                  style.dayText,
                  (isSelected || isInRange) && style.dayTextSelected,
                  day.disabled && style.dayTextDisabled,
                ]}>
                {day.dayString}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    })}
  </View>
);
};

const styles = theme =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
    },
    dayItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 3,
    },
    dayItemSelected: {
      backgroundColor: theme.mainColor,
    },
    dayText: {
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
      textAlign: 'center',
      width: '100%',
    },
    dayTextSelected: {
      color: theme.selectedTextColor,
      fontFamily: theme.headerFont,
    },
    dayTextDisabled: {
      opacity: 0.2,
    },
  });

export {Days};
