Feature: Gestión de Citas Médicas
  Como paciente
  Quiero gestionar mis citas médicas
  Para poder planificar mis visitas al médico

  Scenario: Reservar una nueva cita médica
    Given Estoy en la página de reservas de citas médicas
    When Selecciono una fecha y hora para la cita médica
    And Confirmo la reserva
    Then Debería ver un mensaje de confirmación

  Scenario: Cancelar una cita médica existente
    Given Tengo una cita médica programada para el {string} a las {string}
    When Intento cancelar la cita médica
    Then Debería ver un mensaje de cancelación exitosa
