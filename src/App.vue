<template>
    <div id="app">
        <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        </nav> -->
        <router-view/>
    </div>
</template>

<style>
    :root {
        --fuente-principal: 'Poppins', sans-serif;
        --fuente-secundaria: 'Poppins', sans-serif;

        --color-bg: #fdfaf5;
        --color-principal: #EFAA39;
        --color-principal-transparente: rgba(239, 170, 57, .5);
        --color-boton-principal: #EFAA39;
        
        --color-titulo: #EFAA39;
        --color-subtitulo: #526D94;
        --color-inputs: #B1BDCE;
        --color-texto-rojo: #EA5A47;

        --redondeado-1: 16px;

        --color-blanco: #ffffff;
        --color-negro: #000000;
        --color-error: #D9251B;
    }

    html {
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }
    body { 
        font-size: 16px;
        background-color: var(--color-bg) !important;
    }

    h1, h2, h3, h4, h5, h6,
    .titulo-h1, .titulo-h2, .titulo-h3, .titulo-h4, .titulo-h5, .titulo-h6 {
        font-family: var(--fuente-principal);
        font-weight: 800 !important; 
        color: var(--color-titulo);
    }

    p {
        font-family: var(--fuente-secundaria);
    }

    h1, .titulo-h1 {
        font-size: 48px;
    }
    h2, .titulo-h2 {
        font-size: 36px;
    }
    h3, .titulo-h3 {
        font-size: 32px;
    }
    h4, .titulo-h4 {
        font-size: 28px;
    }

    h5, .titulo-h5 {
        font-size: 24px;
    }

    h6, .titulo-h6 {
        font-size: 20px;
    }

    img {
        max-width: 100%;
        height: 100%;
    }

    .btn.boton{
        border-radius: 12px;
        border: 0;
        min-height: 42px;
        font-weight: 700;
        font-size: 20px;
        padding: 0.375rem 1.5rem;
        display: block;
        margin: 0 auto;
    }
    .btn.boton-principal,
    .btn.btn-boton-principal{
        background-color: var(--color-boton-principal);
        border-color: var(--color-boton-principal);
        color: #fff;
    }
    .btn.boton-principal:hover,
    .btn.btn-boton-principal:hover{
        opacity: .92;
        background-color: var(--color-boton-principal);
    }
    .btn.boton-principal:focus,
    .btn.btn-boton-principal:focus{
        background-color: var(--color-boton-principal);
        box-shadow: 0 0 0 0.2rem var(--color-principal-transparente);
    }
    .btn.boton-principal:not(:disabled):not(.disabled):active,
    .btn.btn-boton-principal:not(:disabled):not(.disabled):active{
        background-color: var(--color-boton-principal);
        box-shadow: 0 0 0 0.2rem var(--color-principal-transparente);
    }
    .btn.boton-principal:not(:disabled):not(.disabled):active:focus,
    .btn.btn-boton-principal:not(:disabled):not(.disabled):active:focus{
        box-shadow: 0 0 0 0.2rem var(--color-principal-transparente);
    }
    /* Mensaje de error*/
    .mensaje-error{
        color: var(--color-error)
    }

    /* EXTRAS GENERALES */
    .card.card-formulario{
        padding: 20px 30px;
        background-color: var(--color-blanco);
		border-radius: var(--redondeado-1);
		border: 0;
		margin: 0 auto;
        box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.1);
    }
</style>
