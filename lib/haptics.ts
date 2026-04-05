/**
 * Haptic Feedback Utilities
 * Provides vibration feedback for mobile interactions
 */

export const haptics = {
  /**
   * Light haptic feedback (10ms)
   * Use for: hover states, minor interactions
   */
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  },

  /**
   * Medium haptic feedback (20ms)
   * Use for: button clicks, selections
   */
  medium: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20)
    }
  },

  /**
   * Heavy haptic feedback (30ms)
   * Use for: important actions, confirmations
   */
  heavy: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30)
    }
  },

  /**
   * Success pattern (double tap)
   * Use for: successful form submissions, completions
   */
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([10, 50, 10])
    }
  },

  /**
   * Error pattern (triple tap)
   * Use for: errors, validation failures
   */
  error: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([10, 30, 10, 30, 10])
    }
  },

  /**
   * Warning pattern (long-short)
   * Use for: warnings, alerts
   */
  warning: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([30, 50, 10])
    }
  },

  /**
   * Selection pattern (quick tap)
   * Use for: selecting items, toggling
   */
  selection: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(15)
    }
  },
}
