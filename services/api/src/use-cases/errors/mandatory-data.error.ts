export class MandatoryDataError extends Error {
  constructor() {
    super('Title or Description are required.')
  }
}