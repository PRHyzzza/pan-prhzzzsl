<script setup lang="ts">
import { createPopper } from '@popperjs/core'
const dom = ref(null)
const res = await axios('public/contributions')
dom.value = res.data.data
onMounted(() => {
  const rectDom: NodeListOf<SVGRectElement> = document.querySelectorAll('rect')
  rectDom.forEach((rect: SVGRectElement, index: number) => {
    // 添加hover事件
    rect.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div')
      tooltip.className = index < 10 ? 'tooltip top-start' : index > rectDom.length - 10 ? 'tooltip top-end' : 'tooltip top'
      tooltip.innerHTML = `${rect.getAttribute('data-date')}的活跃度为${rect.getAttribute('data-count')}`
      document.body.appendChild(tooltip)
      createPopper(rect, tooltip, {
        placement: index < 10 ? 'top-start' : index > rectDom.length - 10 ? 'top-end' : 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: index < 10 ? [-20, 8] : index > rectDom.length - 10 ? [20, 8] : [0, 8],
            },
          },
        ],
      })
      rect.addEventListener('mouseleave', () => {
        if (tooltip)
          tooltip.remove()
      })
    })
  })
})
</script>

<template>
  <div v-html="dom" />
</template>

<style>
.ContributionCalendar {
  outline: 1px solid rgba(27, 31, 35, 0.06);
  outline-offset: -1px;
}

.ContributionCalendar-day[data-level="0"] {
  fill: #eff6ff;
}

.ContributionCalendar-day[data-level="1"] {
  fill: #bfdbfe;
}

.ContributionCalendar-day[data-level="2"] {
  fill: #60a5fa;
}

.ContributionCalendar-day[data-level="3"] {
  fill: #2563eb;
}

.ContributionCalendar-day[data-level="4"] {
  fill: #1e3a8a;
}

.ContributionCalendar-label {
  font-size: 12px;
  fill: #666;
}

.tooltip {
  position: absolute;
  background: #000;
  border-radius: 4px;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  white-space: nowrap;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  transition: all 0.3s all;
  padding: 5px 10px;
}

/* 下方三角形 */
.tooltip::before {
  content: "";
  position: absolute;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #000;
}

.tooltip.top-start::before {
  left: 17%;
}

.tooltip.top-end::before {
  left: 83%;
}

.tooltip.top::before {
  left: 50%;
}
</style>
