<script setup lang="ts">
import debounceFunction from 'debounce-fn'
import emblaCarouselVue from 'embla-carousel-vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Mode } from '../constants/enums/Mode'
import IconButton from './IconButton.vue'

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
  <div class="w-full relative">
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex -ml-4 touch-pan-y">
        <div
          v-for="{ id, title, hasConfiguration } in slides"
          :key="id"
          class="w-9/12 aspect-square shrink-0 justify-center pl-4 box-content"
        >
          <div
            class="size-full border border-secondary rounded-3xl flex items-center justify-center relative"
          >
            <span class="text-7xl font-blazeface">{{ title }}</span>
            <div
              v-if="hasConfiguration"
              class="absolute h-full w-5/6 flex justify-center items-end pb-3"
              @click="emit('clickSettings')"
            >
              <span class="text-muted-foreground"> Tap to configure </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute top-0 left-0 h-full w-1/12 bg-linear-to-r from-background via-50% via-background/65 to-transparent"
    />
    <div
      class="absolute top-0 right-0 h-full w-1/12 bg-linear-to-l from-background via-50% via-background/65 to-transparent"
    />

    <IconButton
      aria-label="previous"
      class="absolute top-1/2 left-5 -translate-y-1/2"
      @click="onPrevButtonClick"
    >
      <ArrowLeft />
    </IconButton>
    <IconButton
      aria-label="next"
      class="absolute top-1/2 right-5 -translate-y-1/2"
      @click="onNextButtonClick"
    >
      <ArrowRight />
    </IconButton>

    <div class="flex justify-center gap-1 mt-2">
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
