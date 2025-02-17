/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { XBox, YBox } from '../../layout';
import { memo, useId, useMemo } from 'react';
import { useCalendar } from '@crossed/use-calendar';
import { IUseCalendarOptions } from '@crossed/use-calendar';
import { DayButton } from './DayButton';
import { capFirstLetter } from './utils';
import { WeekDay } from './WeekDay';
import { IDay } from '@crossed/use-calendar/src';
import { SelectYear } from './SelectYear';
import { SelectMonth } from './SelectMonth';

export type CalendarProps = Partial<
  Omit<IUseCalendarOptions, 'selectedDate'>
> & {
  locale?: string;
  selectedDate?: Date;
};
export const Calendar = memo<CalendarProps>(
  ({ locale = 'default', ...props }: CalendarProps) => {
    const { months, getDayProps, setMonth, setYear, monthsByYear } =
      useCalendar(props);
    const id = useId();

    const itemsMonth = useMemo(() => {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: 'long',
      });
      const yearSelected = (props.selectedDate || new Date()).getFullYear();
      const toto = Array.from(monthsByYear.get(yearSelected)).map((month) => {
        const d = new Date(yearSelected, month);
        const nameMonth = formatter.format(d);
        return {
          label: capFirstLetter(nameMonth),
          value: month.toString(),
        };
      });
      return toto;
    }, [monthsByYear]);

    return (
      <YBox>
        {months.map(({ year, month, weeks }) => (
          <YBox key={`${id}-month-${month}`} space={'xxs'}>
            <XBox alignItems={'stretch'} space={'md'}>
              <SelectMonth
                month={month}
                onChange={setMonth}
                months={itemsMonth}
              />
              <SelectYear
                year={year}
                onChange={setYear}
                years={Array.from(monthsByYear).map(([year]) => year)}
              />
            </XBox>
            <YBox space={'xxs'}>
              <WeekDay
                days={(weeks[0].length > 0 ? weeks[0] : weeks[1]) as IDay[]}
                locale={locale}
              />
              {weeks.map((week, i) => (
                <XBox
                  key={`${id}-week-${i}`}
                  space={'xxs'}
                  justifyContent="between"
                >
                  {week.map((day, j) => {
                    const { onClick, ...props } = getDayProps({ day });

                    return (
                      <DayButton
                        key={`${id}-day-${j}`}
                        day={day}
                        {...(props as any)}
                        onPress={onClick}
                      />
                    );
                  })}
                </XBox>
              ))}
            </YBox>
          </YBox>
        ))}
      </YBox>
    );
  }
);
