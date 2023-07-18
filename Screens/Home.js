import * as React from 'react';
import { useState, useRef, useEffect } from 'react'
import { CalendarList } from 'react-native-calendars';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';

function User({ userId }) {

}

export default function HomeScreen({ navigation }) {
  const [Data, setData] = useState()

  database()
    .ref(`/Events`)
    .on('value', snapshot => {
      setData(expandData(snapshot.val()))
    });

  const [selectedDay, setSelectedDay] = useState()
  const [currentMonth, setCurrentMonth] = useState();
  const calendarRef = useRef();

  const handleVisibleMonthsChange = (months) => {
    if (months && months.length > 0) {
      const dateString = months[0].dateString;
      if (dateString && typeof dateString === 'string') {
        const dateParts = dateString.split("-");

        // Ensure dateParts has at least 2 elements (year and month)
        if (dateParts.length >= 2) {
          setCurrentMonth(dateParts[1]);
        }
      }
    }
  };

  function expandData(data) {
    const expandedData = {};

    for (const item of data) {
      const { Date: date, Color: color, ...rest } = item;

      if (date.includes('|')) {
        const [startDate, endDate] = date.split('|');
        let d = new Date(startDate);
        let end = new Date(endDate);

        for (; d <= end; d = new Date(d.getTime() + 24 * 60 * 60 * 1000)) {
          const newDate = d.toISOString().split('T')[0];

          expandedData[newDate] = {
            ...rest,
            color,
            Date: newDate,
            textColor: 'white',
            startingDay: d.getTime() === new Date(startDate).getTime(),
            endingDay: d.getTime() === end.getTime(),
          };
        }
      } else {
        expandedData[date] = {
          ...rest,
          color,
          textColor: 'white',
          startingDay: true,
          endingDay: true,
        };
      }
    }

    return expandedData;
  }





  const getLegendForMonth = (month) => {
    if (!month) {
      return []
    }
    // Ensure month is always two digits (e.g. '07' instead of '7')
    month = month.toString().padStart(2, '0');

    // Use an object to store unique colors with their corresponding legend tags
    const uniqueColors = {};

    // Map through the marked dates and add the unique colors to the object
    for (const date in Data) {
      if (date.startsWith(`2023-${month}`)) {
        const { color, legendTag } = Data[date];
        if (!uniqueColors[color]) {
          uniqueColors[color] = legendTag;
        }
      }
    }

    // Convert the object back to an array of {color, legendTag} objects and return it
    return Object.keys(uniqueColors).map(color => ({ color, legendTag: uniqueColors[color] }));
  };


  const handleJumpToToday = () => {
    const firstDayOfCurrentMonth = new Date();
    firstDayOfCurrentMonth.setDate(1);
    const year = firstDayOfCurrentMonth.getFullYear();
    const month = (firstDayOfCurrentMonth.getMonth() + 1).toString().padStart(2, '0');
    const targetDate = `${year}-${month}-01`;
    calendarRef.current.scrollToDay(targetDate, 0, true);
  };

  const Legend = React.memo(({ month }) => {
    const legendItems = React.useMemo(() => getLegendForMonth(month), [month]);

    return (
      <View style={styles.legendContainer}>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendColorDotWrapper}>
            <View
              style={[
                styles.legendColorDot,
                { backgroundColor: item.color },
              ]}
            />
            <Text style={styles.legendColorLabel}>{item.legendTag}</Text>
          </View>
        ))}
      </View>
    );
  });



  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CalendarList

          onDayPress={day => {
            const pressedDate = day.dateString;
            let selectedDate = pressedDate;
            let dateDetails = Data[selectedDate] || {};

            if (dateDetails.color) {
              // If the selected date does not have details, check previous dates
              while (!dateDetails.Description && selectedDate > '2023-01-01') {
                const prevDate = new Date(selectedDate);
                prevDate.setDate(prevDate.getDate() - 1);
                selectedDate = prevDate.toISOString().split('T')[0];
                dateDetails = Data[selectedDate] || {};
              }

              const { Description, color, LegendTag, Icon, Link } = dateDetails;
              navigation.navigate('Details', { selectedDay: pressedDate, description: Description, color: color, legendTag: LegendTag, icon: Icon, link: Link });
            }
          }}

          current='2023-01-01'

          onVisibleMonthsChange={handleVisibleMonthsChange}
          ref={calendarRef}
          markingType={'period'}

          minDate='2023-01-01'
          maxDate='2025-12-31'
          pastScrollRange={9}
          futureScrollRange={12}

          markedDates={Data}
        />
        <View style={styles.legendWrapper}>
          <Legend month={currentMonth} />
        </View>
        <TouchableOpacity onPress={handleJumpToToday} style={styles.jumpToTodayButton}>
          <Text style={styles.jumpToTodayButtonText}>Today</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsHeader: {
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 2,
    padding: 10,
  },
  icon: {
    borderRadius: 50,
    flex: 1,
    resizeMode: 'cover'
  },
  legendWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  jumpToTodayButton: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    position: 'absolute', // <-- Add this
    bottom: 20, // <-- Add this, adjust as needed
    right: 20, // <-- Add this, adjust as needed
  },

  jumpToTodayButtonText: {
    color: '#000',
    fontSize: 16,
  },
  detailsScreenContainer: {
    flex: 1,
  },
  legendTagContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  legendTagText: {// details title
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    overflow: 'hidden',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20,
  },
  dateText: {
    paddingLeft: 10,
    fontSize: 10,
    color: 'white',
    paddingRight: 10
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 20
  },
  descriptionText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'justify'
  },
  returnButton: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  returnButtonText: {
    fontSize: 16,
    color: 'black',
  },
  legendContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    bottom: 55,
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
  },
  legendTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  legendItemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  },
  legendColorLabel: {
    fontSize: 12,
    // whiteSpace: 'nowrap', // <-- Prevent text from breaking to the new line
  },
  jumpToTodayText: {
    fontSize: 16,
    color: 'black',
  },
  legendColorDotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
