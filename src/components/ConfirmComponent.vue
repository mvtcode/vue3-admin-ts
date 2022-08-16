<script lang="ts">
import { ElMessageBox } from "element-plus";

const show = (
  message: string,
  title?: string,
  callback?: (value: boolean) => void
): void => {
  ElMessageBox.confirm(message, title || "Xác nhận", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
    draggable: true,
  })
    .then(() => {
      if (callback) callback(true);
    })
    .catch(() => {
      if (callback) callback(false);
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
