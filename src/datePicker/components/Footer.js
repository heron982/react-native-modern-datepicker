import { View, Button, StyleSheet } from 'react-native';
import { useCalendar } from '../DatePicker';

const Footer = () => {
  const { utils, onDateChange, state, range } = useCalendar();
  const [mainState, setMainState] = state;

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
    <View style={styles.container}>
  <TouchableOpacity
    onPress={handleToday}
    style={{
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: 'transparent',
      marginRight: 8,
    }}
  >
    <Text style={{
      fontFamily: theme.defaultFont,
      fontSize: theme.textFontSize,
      color: theme.textDefaultColor,
    }}>
      Hoje
    </Text>
  </TouchableOpacity>

  {range && (
    <TouchableOpacity
      onPress={handleFullMonth}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: theme.mainColor,
        borderColor: them.borderColor
      }}
    >
      <Text style={{
        fontFamily: theme.defaultFont,
        fontSize: theme.textFontSize,
        color: theme.selectedTextColor,
      }}>
        Mês Inteiro
      </Text>
    </TouchableOpacity>
  )}
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

export { Footer };
