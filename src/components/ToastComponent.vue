<script lang="ts">
import { ElMessage } from "element-plus";

const show = (message: string): void => {
  ElMessage({
    message,
    showClose: true,
    center: true,
  });
};

const showSuccess = (message: string): void => {
  ElMessage({
    message,
    showClose: true,
    type: "success",
    center: true,
  });
};

const showWarning = (message: string): void => {
  ElMessage({
    message,
    showClose: true,
    type: "warning",
    center: true,
  });
};

const showError = (message: string): void => {
  ElMessage({
    message,
    showClose: true,
    type: "error",
    center: true,
  });
};

const closeAll = (): void => {
  ElMessage.closeAll();
};

export default {
  setup() {
    return {
      show,
      showSuccess,
      showWarning,
      showError,
      closeAll,
    };
  },
};
</script>
