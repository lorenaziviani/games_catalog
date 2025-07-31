export const mockInitializeLogRocket = jest.fn()
export const mockTrackNavigation = jest.fn()
export const mockTrackUserInteraction = jest.fn()

export const initializeLogRocket = mockInitializeLogRocket
export const useAnalytics = () => ({
  trackNavigation: mockTrackNavigation,
  trackUserInteraction: mockTrackUserInteraction
})
