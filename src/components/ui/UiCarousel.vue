<script setup lang="ts">
import debounceFunction from 'debounce-fn'
import emblaCarouselVue from 'embla-carousel-vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Mode } from '../../constants/enums/Mode'
import UiIconButton from './UiIconButton.vue'

type CarouselItem = {
  title: string
  id: Mode
  hasConfiguration: boolean
}

const props = withDefaults(
  defineProps<{
    slides: CarouselItem[]
    initialValue?: number
  }>(),
  {
    initialValue: 0
  }
)

const emit = defineEmits<{
  clickSettings: []
  change: [index: number, initial?: boolean]
}>()

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true })

const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

const onPrevButtonClick = () => {
  if (!emblaApi) return
  emblaApi.value?.scrollPrev()
}

const onNextButtonClick = () => {
  if (!emblaApi) return
  emblaApi.value?.scrollNext()
}

const debouncedOnChange = debounceFunction(
  () => {
    emit('change', selectedIndex.value)
  },
  { wait: 500 }
)

const onSelect = () => {
  if (!emblaApi.value) return
  selectedIndex.value = emblaApi.value?.selectedScrollSnap()
  debouncedOnChange()
}

onMounted(() => {
  if (!emblaApi.value) return

  scrollSnaps.value = emblaApi.value.scrollSnapList()

  emblaApi.value?.scrollTo(props.initialValue, true)
  selectedIndex.value = emblaApi.value?.selectedScrollSnap()
  emit('change', selectedIndex.value, true)

  emblaApi.value?.on('select', onSelect)
})
</script>

<template>
  <div class="relative w-full">
    <div ref="emblaRef" class="overflow-hidden">
      <div class="-ml-4 flex touch-pan-y">
        <div
          v-for="{ id, title, hasConfiguration } in slides"
          :key="id"
          class="box-content aspect-square w-9/12 shrink-0 justify-center pl-4"
        >
          <div
            class="border-secondary relative flex size-full items-center justify-center rounded-3xl border"
          >
            <span class="font-blazeface text-7xl">{{ title }}</span>
            <div
              v-if="hasConfiguration"
              class="absolute flex h-full w-5/6 items-end justify-center pb-3"
              @click="emit('clickSettings')"
            >
              <span class="text-muted-foreground"> Tap to configure </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="from-background via-background/65 absolute top-0 left-0 h-full w-1/12 bg-linear-to-r via-50% to-transparent"
    />
    <div
      class="from-background via-background/65 absolute top-0 right-0 h-full w-1/12 bg-linear-to-l via-50% to-transparent"
    />

    <UiIconButton
      aria-label="previous"
      class="absolute top-1/2 left-5 -translate-y-1/2"
      @click="onPrevButtonClick"
    >
      <ArrowLeft />
    </UiIconButton>
    <UiIconButton
      aria-label="next"
      class="absolute top-1/2 right-5 -translate-y-1/2"
      @click="onNextButtonClick"
    >
      <ArrowRight />
    </UiIconButton>

    <div class="mt-2 flex justify-center gap-1">
      <div
        v-for="(_, index) in scrollSnaps"
        :key="index"
        :class="[
          'size-2 rounded-full',
          index === selectedIndex ? 'bg-muted-foreground' : 'bg-secondary'
        ]"
      />
    </div>
  </div>
</template>
