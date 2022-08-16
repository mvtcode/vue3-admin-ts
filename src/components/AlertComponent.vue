<script lang="ts">
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

const show = (
  message: string,
  title?: string,
  callback?: (value: boolean) => void
): void => {
  ElMessageBox.alert(message, title || "Thông báo", {
    confirmButtonText: "OK",
    draggable: true,
    callback: (action: Action) => {
      if (callback) {
        callback(action === "confirm");
      }
    },
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
