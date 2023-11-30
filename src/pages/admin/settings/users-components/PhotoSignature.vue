<template>
  <div class="card w-100 position-relative overflow-hidden">
    <ul
      class="nav nav-pills user-profile-tab border-bottom"
      id="pills-tab"
      role="tablist"
    >
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>
          <li class="nav-item pe-none" role="presentation">
            <button
              class="nav-link fw-semibold position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
              id="pills-description-tab"
              type="button"
              role="tab"
              aria-controls="pills-description"
            >
              {{ modalDetails.title }} Profile
            </button>
          </li>
        </div>
        <div class="d-flex">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
              id="pills-description-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-description"
              type="button"
              role="tab"
              aria-controls="pills-description"
              aria-selected="true"
            >
              <i class="ti ti-photo fs-4"></i>&nbsp; Photo
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
              id="pills-reviews-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-reviews"
              type="button"
              role="tab"
              aria-controls="pills-reviews"
              aria-selected="false"
            >
              <i class="ti ti-signature fs-4"></i>&nbsp; Signature
            </button>
          </li>
        </div>
      </div>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-description"
        role="tabpanel"
        aria-labelledby="pills-description-tab"
        tabindex="0"
      >
        <div class="card-body p-4">
          <p class="card-subtitle mb-4">Upload Photo (Optional)</p>
          <div class="text-center">
            <img
              ref="userProfileImage"
              id="profile-image"
              :src="imageUrl"
              alt="user-profile"
              class="rounded-circle border border-secondary"
              width="120"
              height="120"
            />
            <div
              class="d-flex align-items-center justify-content-center my-4 gap-2"
            >
              <input
                type="file"
                @change="$emit('validate-image')"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                style="display: none"
                ref="imageInput"
              />
              <button
                class="btn btn-primary"
                @click.prevent="$emit('change-photo')"
              >
                Upload
              </button>
              <button
                class="btn btn-outline-danger"
                @click.prevent="$emit('reset-image')"
              >
                Reset
              </button>
            </div>
            <p class="mb-0">Allowed JPG, JPEG, PNG or GIF. Max size of 2MB</p>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-reviews"
        role="tabpanel"
        aria-labelledby="pills-reviews-tab"
        tabindex="0"
      >
        <div class="card-body p-4">
          <p class="card-subtitle mb-4">Upload Signature (Optional)</p>
          <div class="text-center">
            <img
              ref="userSignImage"
              id="profile-signature"
              :src="signatureURL"
              alt="user-profile"
              class="border border-secondary"
              width="120"
              height="120"
            />
            <div
              class="d-flex align-items-center justify-content-center my-4 gap-2"
            >
              <input
                type="file"
                @change="$emit('validate-sign')"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                style="display: none"
                ref="signInput"
              />
              <button
                class="btn btn-primary"
                @click.prevent="$emit('change-signature')"
              >
                Upload
              </button>
              <button
                class="btn btn-outline-danger"
                @click.prevent="$emit('reset-signature')"
              >
                Reset
              </button>
            </div>
            <p class="mb-0">Allowed JPG, JPEG, PNG or GIF. Max size of 2MB</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PhotoSignature",
  props: {
    formData: Object,
    modalDetails: Object,
    imageUrl: String,
    signatureURL: String,
    signInput: {
      type: Object,
      required: true,
    },
    imageInput: {
      type: Object,
      required: true,
    },
    userProfileImage: {
      type: Object,
      required: true,
    },
    userSignImage: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style scoped></style>
