<script setup lang="ts">
import { createPopper } from '@popperjs/core'
const { width } = useWindowSize()
const dom = ref(null)
const res = await axios('public/contributions')
dom.value = res.data.data
onMounted(() => {
  const rectDom: NodeListOf<SVGRectElement> = document.querySelectorAll('rect')
  rectDom.forEach((rect: SVGRectElement, index: number) => {
    // 添加hover事件
    rect.addEventListener('mouseenter', () => {
      if (width.value < 823)
        return
      const placement = computed(() => {
        return index < 14 ? 'top-start' : index > rectDom.length - 14 ? 'top-end' : 'top'
      })
      const tooltip = document.createElement('div')
      tooltip.className = `tooltip ${placement.value}`
      tooltip.innerHTML = `${rect.getAttribute('data-date')}的活跃度为${rect.getAttribute('data-count')}`
      document.body.appendChild(tooltip)
      createPopper(rect, tooltip, {
        placement: placement.value,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: index < 14 ? [-20, 8] : index > rectDom.length - 14 ? [20, 8] : [0, 8],
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
  --at-apply:
  fill-blue-50
}

.ContributionCalendar-day[data-level="1"] {
  --at-apply:
  fill-blue-300
}

.ContributionCalendar-day[data-level="2"] {
  --at-apply:
  fill-blue-500
}

.ContributionCalendar-day[data-level="3"] {
  --at-apply:
  fill-blue-700
}

.ContributionCalendar-day[data-level="4"] {
  --at-apply:
  fill-blue-900
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

@media screen and (max-width: 823px) {
  .tooltip {
    display: none;
  }
}
</style>
