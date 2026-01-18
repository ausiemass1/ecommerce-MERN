"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_product_routes_1 = __importDefault(require("./routes/user.product.routes"));
const auth_1 = __importDefault(require("./routes/auth"));
const cart_1 = __importDefault(require("./routes/cart"));
const checkout_routes_1 = __importDefault(require("./routes/checkout.routes"));
const admin_product_routes_1 = __importDefault(require("./routes/admin/admin.product.routes"));
const admin_order_routes_1 = __importDefault(require("./routes/admin/admin.order.routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const admin_user_routes_1 = __importDefault(require("./routes/admin/admin.user.routes"));
const app = (0, express_1.default)();
/* 🔥 STRIPE WEBHOOK — MUST BE FIRST */
app.use("/api/webhooks/stripe", express_1.default.raw({ type: "application/json" }), webhook_routes_1.default);
/* ---------- GLOBAL MIDDLEWARE ---------- */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* ---------- API ROUTES ---------- */
app.use("/api/products", user_product_routes_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/cart", cart_1.default);
app.use("/api", checkout_routes_1.default);
app.use("/api/admin/products", admin_product_routes_1.default);
app.use("/api/admin/orders", admin_order_routes_1.default);
app.use("/api/admin/users", admin_user_routes_1.default);
/* ---------- STATIC FILES ---------- */
const rootPath = path_1.default.join(__dirname, "..");
app.use(express_1.default.static(rootPath));
const adminPath = path_1.default.join(rootPath, "admin");
app.use("/admin", express_1.default.static(adminPath));
app.get(/^\/admin(\/.*)?$/, (req, res) => {
    res.sendFile(path_1.default.join(adminPath, "index.html"));
});
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path_1.default.join(rootPath, "index.html"));
});
exports.default = app;
