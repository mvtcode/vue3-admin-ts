<script lang="ts">
import { ElMessageBox } from "element-plus";

const show = (
  message: string,
  title?: string,
  callback?: (value: string | null) => void
): void => {
  ElMessageBox.prompt(message, title || "Nhập giá trị", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    draggable: true,
  })
    .then(({ value }) => {
      if (callback) callback(value);
    })
    .catch(() => {
      if (callback) callback(null);
    });
};

export default {
  setup() {
    return {
      show,
    };
  },
};
</script>
