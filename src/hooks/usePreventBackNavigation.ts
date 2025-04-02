import { onMounted, onBeforeUnmount } from 'vue'

export function usePreventBackNavigation(onBackPress: () => void) {
  onMounted(() => {
    window.history.pushState(null, '', window.location.href)

    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href)
      if (typeof onBackPress === 'function') {
        onBackPress()
      }
    }

    window.addEventListener('popstate', handlePopState)

    onBeforeUnmount(() => {
      window.removeEventListener('popstate', handlePopState)
    })
  })
}
