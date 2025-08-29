/**
 * @license
 * Copyright 2025 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

class MyCustomOfferwallChoice {
  // Whether or not the user should be allowed to bypass the Offerwall.
  private isUserEntitledToAccess = false;

  // Whether the custom Offerwall choice should be disabled.
  private isCustomOfferwallChoiceDisabled = false;

  /**
   * Custom choice initialization logic.
   */
  async initialize() {
    if (this.isCustomOfferwallChoiceDisabled) {
      // Indicate that the custom choice option should not be displayed.
      return Promise.resolve(
          window.googlefc.offerwall.customchoice.InitializeResponseEnum
              .CUSTOM_CHOICE_DISABLED);
    }

    if (this.isUserEntitledToAccess) {
      // Indicate that the user should not be shown the Offerwall.
      return Promise.resolve(window.googlefc.offerwall.customchoice
                                 .InitializeResponseEnum.ACCESS_GRANTED);
    }

    // Indicate that the user may be shown the Offerwall.
    return Promise.resolve(window.googlefc.offerwall.customchoice
                               .InitializeResponseEnum.ACCESS_NOT_GRANTED);
  }

  /**
   * Custom choice display logic.
   */
  async show() {
    // Locate the custom choice modal dialog.
    const modal =
        document.querySelector('.custom-choice-modal') as HTMLDialogElement;

    // Show modal and return a Promise that will resolve when the modal is
    // closed.
    return new Promise<boolean>((resolve) => {
      // Attach an event listener to resolve the Promise when the modal is
      // closed.
      modal?.addEventListener('close', () => {
        // Return `true` if the subscribe button was clicked, otherwise `false`.
        resolve(modal?.returnValue === 'subscribe');
      }, {once: true});

      // Show the custom choice modal.
      modal?.showModal();
    });
  }
}

// Instantiate the Offerwall custom choice registry and register your custom
// choice implementation. Instantiating the registry lets you begin interacting
// with it immediately, even if the Offerwall library hasn't finished loading.
window.googlefc = window.googlefc || {};
window.googlefc.offerwall = window.googlefc.offerwall || {};
window.googlefc.offerwall.customchoice =
    window.googlefc.offerwall.customchoice || {};
window.googlefc.offerwall.customchoice.registry = new MyCustomOfferwallChoice();

/**
 * Offerwall custom choice type definitions.
 *
 * @see https://developers.google.com/funding-choices/offerwall-custom-choice-docs
 */
interface Window {
  googlefc: {
    offerwall: {
      customchoice: {
        InitializeResponseEnum: {
          CUSTOM_CHOICE_DISABLED: number;
          ACCESS_GRANTED: number;
          ACCESS_NOT_GRANTED: number;
        };
        registry: {
          initialize: () => Promise<number>;
          show: () => Promise<boolean>;
        };
      };
    };
  };
}
