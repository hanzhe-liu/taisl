import { ElMessage } from "element-plus";

const tips = class {
  constructor(message, type = "success") {
    this.message = message;
    this.type = type;
  }
  // 提示
  mess_age() {
    ElMessage({ message: this.message, type: this.type, duration: 1000 });
  }
};
export default tips;
