package org.motechproject.scheduletracking.api.utility;

import org.joda.time.LocalDate;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;

public class DateTimeUtil {
	private DateTimeUtil() {
	}

	public static LocalDate daysAgo(int numberOfDays) {
		return LocalDate.now().minusDays(numberOfDays);
	}

	public static LocalDate weeksAgo(int numberOfWeeks) {
		return LocalDate.now().minusWeeks(numberOfWeeks);
	}

	public static LocalDate daysAfter(int numberOfDays) {
		return LocalDate.now().plusDays(numberOfDays);
	}

	public static LocalDate weeksAfter(int numberOfWeeks) {
		return LocalDate.now().plusWeeks(numberOfWeeks);
	}

	public static WallTime wallTimeOf(int numberOfWeeks) {
		return new WallTime(numberOfWeeks, WallTimeUnit.Week);
	}
}
