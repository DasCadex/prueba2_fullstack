import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // para simular rutas
import InicioSesion from "../pages/inicioSesion"; // Importamos el componente modificado

// Bloque principal de pruebas: todas las pruebas relacionadas con el componente InicioSesion
describe("InicioSesion Component", () => {
  
  // PRUEBA 1: Verificar que los campos se muestren correctamente
  it("muestra los campos de correo y contraseña", () => {
    // Renderizamos el componente. 
    // Le pasamos funciones vacías (vi.fn()) para que no den error.
    render(
      <MemoryRouter>
        <InicioSesion 
          onLoginSuccess={vi.fn()} 
          onNavigateToRegistro={vi.fn()} 
        />
      </MemoryRouter>
    );
    // Verificamos que los inputs del formulario estén presentes
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    // También comprobamos que el botón 'Ingresar' esté visible
    expect(screen.getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
  });

  // PRUEBA 2: Validar comportamiento cuando los campos están vacíos
  // (Adaptado a tu lógica de validación 'onChange')
  it("muestra errores si los campos se modifican y se dejan vacíos", async () => {
    render(
      <MemoryRouter>
        <InicioSesion 
          onLoginSuccess={vi.fn()} 
          onNavigateToRegistro={vi.fn()} 
        />
      </MemoryRouter>
    );
    
    // Simulamos que el usuario escribe y luego borra
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "test" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "" } });

    // Buscar errores de validación (los textos de tu componente)
    expect(await screen.findByText(/el correo electrónico es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
  });

  // PRUEBA 3: Acepta credenciales correctas
  // (Ahora sí es idéntico a tu ejemplo de Login.test.js)
  it("acepta credenciales correctas", async () => {
    // 1. Creamos nuestra función simulada (mock)
    const mockOnLoginSuccess = vi.fn(); 
    const mockOnNavigate = vi.fn();
    const emailValido = "vega@gmail.com";

    render(
      <MemoryRouter>
        {/* 2. Pasamos la función simulada como prop */}
        <InicioSesion 
          onLoginSuccess={mockOnLoginSuccess} 
          onNavigateToRegistro={mockOnNavigate} 
        />
      </MemoryRouter>
    );

    // 3. Llenamos el formulario
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: emailValido } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "1234" } });
    
    // 4. Hacemos clic en el botón (que ya debe estar habilitado)
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    // 5. Verificamos que la prop onLoginSuccess debe haberse llamado
    expect(mockOnLoginSuccess).toHaveBeenCalled();
    // Opcionalmente, verificamos que se llamó con el email correcto:
    expect(mockOnLoginSuccess).toHaveBeenCalledWith(emailValido);
  });
});