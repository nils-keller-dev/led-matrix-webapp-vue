<script lang="ts" setup>
import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import { postImage } from '../api/image.post'
import { useStore } from '../store/store'
import TheButton from './TheButton.vue'
import TheDialog from './TheDialog.vue'

const isModalOpen = ref(false)
const imgSrc = ref<string>('')
const fileName = ref<string>('')
const croppedImageFile = ref<File | undefined>(undefined)

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

const onChangeCrop = (file: File) => {
  croppedImageFile.value = file
}

const onClickConfirm = () => {
  uploadFile(croppedImageFile.value)
}
</script>

<template>
  <div
    class="w-full aspect-square rounded-xl border border-dashed border-muted-foreground text-muted-foreground flex items-center justify-center relative"
  >
    <label for="file" class="size-full absolute" />
    <input
      id="file"
      type="file"
      accept=".jpg, .jpeg, .png, .gif"
      class="opacity-0 size-0"
      @input="onSelectFile"
    />
    <Plus />
    <TheDialog v-model:open="isModalOpen">
      <div class="flex flex-col gap-4">
        <!-- <ImageCropper src={imgSrc.value} on-change-crop={onChangeCrop} /> -->
        <div class="flex justify-between">
          <TheButton
            text="Cancel"
            is-secondary
            @click="() => (isModalOpen = false)"
          />
          <TheButton text="Confirm" @click="onClickConfirm" />
        </div>
      </div>
    </TheDialog>
  </div>
</template>
