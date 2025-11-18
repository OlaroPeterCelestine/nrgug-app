import 'package:flutter/material.dart';
import '../models/show.dart';

class ShowHelper {
  /// Get the current show based on the current time and day of week
  static Show? getCurrentShow(List<Show> shows) {
    if (shows.isEmpty) return null;

    final now = DateTime.now();
    final currentDay = _getDayName(now.weekday);
    final currentTime = TimeOfDay.fromDateTime(now);

    // Filter shows for today
    final todayShows = shows.where((show) {
      return show.dayOfWeek.toLowerCase() == currentDay.toLowerCase();
    }).toList();

    if (todayShows.isEmpty) return null;

    // Find the show that matches the current time
    for (var show in todayShows) {
      final showTimeRange = _parseTimeRange(show.time);
      if (showTimeRange != null) {
        final (startTime, endTime) = showTimeRange;
        if (_isTimeInRange(currentTime, startTime, endTime)) {
          return show;
        }
      }
    }

    // If no show is currently on, return the next upcoming show
    return _getNextShow(todayShows, currentTime) ?? todayShows.first;
  }

  /// Get day name from weekday number (1=Monday, 7=Sunday)
  static String _getDayName(int weekday) {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    return days[weekday - 1];
  }

  /// Parse time range string like "6:00 AM - 10:00 AM" or "12:00 PM - 4:00 PM"
  static (TimeOfDay, TimeOfDay)? _parseTimeRange(String timeString) {
    try {
      final parts = timeString.split(' - ');
      if (parts.length != 2) return null;

      final startTime = _parseTime(parts[0].trim());
      final endTime = _parseTime(parts[1].trim());

      if (startTime == null || endTime == null) return null;

      return (startTime, endTime);
    } catch (e) {
      return null;
    }
  }

  /// Parse time string like "6:00 AM", "12:00 PM", or "14:00" (24-hour)
  static TimeOfDay? _parseTime(String timeString) {
    try {
      final isPM = timeString.toUpperCase().contains('PM');
      final isAM = timeString.toUpperCase().contains('AM');
      
      // Remove AM/PM and trim
      var timeOnly = timeString
          .replaceAll(RegExp(r'[AaPp][Mm]'), '')
          .trim();
      
      final parts = timeOnly.split(':');
      if (parts.length != 2) return null;

      var hour = int.parse(parts[0]);
      final minute = int.parse(parts[1]);

      // If no AM/PM specified, assume 24-hour format
      if (!isAM && !isPM) {
        // Already in 24-hour format
        return TimeOfDay(hour: hour, minute: minute);
      }

      // Convert 12-hour to 24-hour format
      if (isPM && hour != 12) {
        hour += 12;
      } else if (isAM && hour == 12) {
        hour = 0;
      }

      return TimeOfDay(hour: hour, minute: minute);
    } catch (e) {
      return null;
    }
  }

  /// Check if current time is within the show's time range
  static bool _isTimeInRange(TimeOfDay current, TimeOfDay start, TimeOfDay end) {
    final currentMinutes = current.hour * 60 + current.minute;
    final startMinutes = start.hour * 60 + start.minute;
    final endMinutes = end.hour * 60 + end.minute;

    // Handle shows that span midnight
    if (endMinutes < startMinutes) {
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  /// Get the next upcoming show
  static Show? _getNextShow(List<Show> shows, TimeOfDay currentTime) {
    final currentMinutes = currentTime.hour * 60 + currentTime.minute;
    
    Show? nextShow;
    int? minDiff;

    for (var show in shows) {
      final timeRange = _parseTimeRange(show.time);
      if (timeRange != null) {
        final (startTime, _) = timeRange;
        final startMinutes = startTime.hour * 60 + startTime.minute;
        
        // Calculate difference (handle next day)
        int diff = startMinutes - currentMinutes;
        if (diff < 0) diff += 24 * 60; // Next day

        if (minDiff == null || diff < minDiff) {
          minDiff = diff;
          nextShow = show;
        }
      }
    }

    return nextShow;
  }

  /// Check if a show is currently live
  static bool isShowLive(Show show) {
    final now = DateTime.now();
    final currentDay = _getDayName(now.weekday);
    
    if (show.dayOfWeek.toLowerCase() != currentDay.toLowerCase()) {
      return false;
    }

    final currentTime = TimeOfDay.fromDateTime(now);
    final timeRange = _parseTimeRange(show.time);
    
    if (timeRange == null) return false;
    
    final (startTime, endTime) = timeRange;
    return _isTimeInRange(currentTime, startTime, endTime);
  }
}

