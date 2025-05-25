/* eslint-disable no-unused-vars */
"use client";

import Illustration from "../../assets/landing-illustration.png";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function HeroSection() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-36 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 sm:gap-16 relative z-10 min-h-[calc(100vh-80px)]">
        {/* Texto */}
        <motion.div
          className="w-full lg:max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            ¡COBRA FÁCIL <br className="hidden sm:block" /> Y RÁPIDO!
          </h1>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Olvídate del seguimiento manual. Con TeLoCobro puedes programar
            recordatorios, llevar el control de pagos y gestionar tus clientes
            desde un solo lugar.
          </p>
          <button
            onClick={onOpen}
            className="mt-6 px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 transition"
          >
            Más Información
          </button>
        </motion.div>

        {/* Ilustración animada levitando */}
        <motion.div
          className="w-[280px] sm:w-[260px] md:w-[320px] lg:w-[400px] mt-20 lg:mt-0"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <img
            src={Illustration}
            alt="Ilustración"
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Curva Inferior */}
      <div className="absolute bottom-[-1px] left-0 right-0 w-screen z-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#9333EA" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            d="M0,96L48,101.3C96,107,192,117,288,133.3C384,149,480,171,576,181.3C672,192,768,192,864,170.7C960,149,1056,107,1152,85.3C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Modal funcional en cualquier pantalla */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        placement="center"
        backdrop="blur"
        classNames={{
          base: "relative max-w-lg mx-auto rounded-2xl bg-white shadow-2xl",
          backdrop: "bg-black/30",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold transition"
                aria-label="Cerrar"
              >
                ×
              </button>

              <ModalBody className="text-sm text-gray-800 space-y-4 pt-10 px-6 pb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  ¿Qué es TeLoCobro?
                </h2>
                <p>
                  TeLoCobro es una solución diseñada para simplificar el proceso
                  de cobranza de pequeñas y medianas empresas.
                </p>
                <p>
                  Desde el registro de clientes hasta la automatización de
                  recordatorios, esta herramienta permite centralizar y
                  controlar todos tus cobros desde una única plataforma.
                </p>
                <p>
                  TeLoCobro ahorra tiempo, reduce olvidos y mejora la relación
                  con tus clientes.
                </p>
              </ModalBody>

              <ModalFooter className="px-6 pb-6 justify-end">
                <Button
                  onPress={onClose}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition"
                >
                  ¡Entendido!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
