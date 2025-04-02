<script lang="ts" setup>
import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import { postImage } from '../../api/image.post'
import { useStore } from '../../store/store'
import ImageCropper from './ImageCropper.vue'
import UiDialog from '../ui/UiDialog.vue'

const isModalOpen = ref(false)
const imgSrc = ref<string>('')
const fileName = ref<string>('')

const store = useStore()

const onSelectFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = (target.files as FileList)[0]

  fileName.value = file.name

  if (file.type === 'image/gif') {
    uploadFile(file)
    return
  }

  isModalOpen.value = true

  const reader = new FileReader()
  reader.addEventListener('load', () => {
    imgSrc.value = reader.result?.toString() || ''
    target.value = ''
  })

  reader.readAsDataURL(file)
}

const uploadFile = (file?: File) => {
  if (!file) {
    return
  }

  const normalizedFileName = fileName.value.replace(/[^a-z0-9.]/gi, '_')

  const newFileName = store.images?.includes(normalizedFileName)
    ? `${Date.now()}_${normalizedFileName}`
    : normalizedFileName

  const renamedFile = new File([file], newFileName, { type: file.type })

  postImage(renamedFile).catch(() => {
    store.images =
      store.images?.toSpliced(
        store.images.findIndex((img) => img === newFileName),
        1
      ) ?? null
  })

  store.images = [...store.images!, newFileName]

  imgSrc.value = `api/image/${fileName.value}`
  isModalOpen.value = false
}
</script>

<template>
  <div
    class="border-muted-foreground text-muted-foreground relative flex aspect-square w-full items-center justify-center rounded-xl border border-dashed"
  >
    <label for="file" class="absolute size-full" />
    <input
      id="file"
      type="file"
      accept=".jpg, .jpeg, .png, .gif"
      class="size-0 opacity-0"
      @input="onSelectFile"
    />
    <Plus />
    <UiDialog v-model:open="isModalOpen">
      <ImageCropper
        :src="imgSrc"
        @confirm="uploadFile"
        @cancel="() => (isModalOpen = false)"
      />
    </UiDialog>
  </div>
</template>
