<script setup lang="ts">
import { createPopper } from '@popperjs/core'
const dom = ref(null)
const res = await axios('public/contributions')
dom.value = res.data.data
onMounted(() => {
  document.querySelectorAll('rect').forEach((rect: SVGRectElement) => {
    // 添加hover事件
    rect.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div')
      tooltip.className = 'tooltip'
      tooltip.innerHTML = `${rect.getAttribute('data-date')}的活跃度为${rect.getAttribute('data-count')}`
      document.body.appendChild(tooltip)
      createPopper(rect, tooltip, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
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
  fill: #ebedf0;
}

.ContributionCalendar-day[data-level="1"] {
  fill: #9be9a8;
}

.ContributionCalendar-day[data-level="2"] {
  fill: #40c463;
}

.ContributionCalendar-day[data-level="3"] {
  fill: #30a14e;
}

.ContributionCalendar-day[data-level="4"] {
  fill: #216e39;
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
  padding: 4px 8px;
}

/* 下方三角形 */
.tooltip::before {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #000;
}
</style>
