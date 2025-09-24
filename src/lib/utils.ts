import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function scrollToSection(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
    
    if (isMobile) {
      // 移动端使用更兼容的滚动方式
      const headerHeight = 64 // Header 高度
      const elementPosition = element.offsetTop - headerHeight
      
      // 使用 requestAnimationFrame 确保更好的性能
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Math.max(0, elementPosition),
          behavior: 'smooth'
        })
      })
    } else {
      // 桌面端使用 scrollIntoView
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func.apply(this, args)
    }
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}
