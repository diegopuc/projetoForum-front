import { ref } from "vue";

export const createIsOpen = ref<boolean>(false);
export const editIsOpen = ref<boolean>(false);
export const viewIsOpen = ref<boolean>(false);
export const deleteIsOpen = ref<boolean>(false);

export function closeModal() {
  createIsOpen.value = false;
  editIsOpen.value = false;
  viewIsOpen.value = false;
  deleteIsOpen.value = false;
}

export function openEditModal() {
  editIsOpen.value = true;
}
export function openCreateModal() {
  createIsOpen.value = true;
  // console.log(createIsOpen)
}
export function openViewModal() {
  viewIsOpen.value = true;
}

export function openDeleteModal() {
  deleteIsOpen.value = true;
}
