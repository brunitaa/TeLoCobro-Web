/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";

const toastVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const types = {
  success: {
    bg: "bg-green-100 text-green-800",
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
  },
  danger: {
    bg: "bg-red-100 text-red-800",
    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
  },
  warning: {
    bg: "bg-yellow-100 text-yellow-800",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
  },
  info: {
    bg: "bg-blue-100 text-blue-800",
    icon: <Info className="w-6 h-6 text-blue-600" />,
  },
  default: {
    bg: "bg-gray-800 text-white",
    icon: <Info className="w-6 h-6 text-white" />,
  },
};

export default function Toast({ visible, type = "default", title = "", message = "", onClose }) {
  const config = types[type] || types.default;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className="fixed z-50 bottom-6 right-6 max-w-xs w-full sm:max-w-sm sm:right-6 sm:bottom-6 sm:items-end sm:justify-end px-4 sm:px-0">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={toastVariants}
            transition={{ duration: 0.4 }}
            className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border border-opacity-20 backdrop-blur-sm ${config.bg}`}
          >
            {config.icon}
            <div className="flex-1">
              {title && <h4 className="font-semibold mb-1 text-base">{title}</h4>}
              <p className="text-sm leading-tight">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}