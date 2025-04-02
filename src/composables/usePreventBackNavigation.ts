import { onBeforeUnmount } from 'vue'

export function usePreventBackNavigation(onBackPress: () => void) {
  const handlePopState = () => {
    window.history.pushState(null, '', window.location.href)
    onBackPress()
  }

  window.history.pushState(null, '', window.location.href)
  window.addEventListener('popstate', handlePopState)

  onBeforeUnmount(() => {
    window.removeEventListener('popstate', handlePopState)
  })
}
