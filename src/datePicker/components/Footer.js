import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useCalendar} from '../DatePicker';

const Footer = () => {
  const {utils, onDateChange, state, range} = useCalendar();
  const [mainState, dispatch] = state;

  const handleToday = () => {
    const today = utils.getToday();
    dispatch({type: 'SET_DATE', payload: today});
    if (onDateChange) {
      onDateChange(today);
    }
  };

  const handleFullMonth = () => {
    if (!range) return;

    const activeDate = utils.getDate(mainState.activeDate);
    const firstDay = utils.startOfMonth(activeDate);
    const lastDay = utils.endOfMonth(activeDate);

    dispatch({type: 'SET_RANGE_DATE', payload: {startDate: firstDay, endDate: lastDay}});
    if (onDateChange) {
      onDateChange({startDate: firstDay, endDate: lastDay});
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Hoje" onPress={handleToday} />
      {range && <Button title="Mês Inteiro" onPress={handleFullMonth} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export {Footer};
