type UseScrollToReturnType = {
  scrollToElement: (elementId: string) => void
}

export function useScrollTo(): UseScrollToReturnType {
  function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return {
    scrollToElement,
  }
}
