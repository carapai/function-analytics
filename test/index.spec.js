/* global describe, it, before */

import chai from 'chai';
import { Fn } from '../src/index';

chai.expect();

const expect = chai.expect;

Fn.init({
  baseUrl: 'https://play.dhis2.org/2.29/api/',
  username: 'admin',
  password: 'district'
});

describe('Given an initial instance', () => {
  it('Check if instance is ready', () => {
    var runner = new Fn.Runner();

    expect(runner.instance !== undefined).to.be.equal(true);
  });
  it('should return promise with analytics results', () => {
    var analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('ImspTQPwCqd');
    return analytics.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  });
  it('should return promise with sql results results', () => {
    var sqlView = new Fn.SQLViewData('GCZ01m3pIRd');

    return sqlView.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
      expect(results.title !== undefined).to.be.equal(true);
      expect(results.subtitle !== undefined).to.be.equal(true);
    });
  });
});

describe('Given an initial instance (Dependency Test)', () => {
  it('should return promise with analytics results (Dependency)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics.preProcess(new Fn.Dependency(
      orgunitProcessor,
      (data, analyticsProcessor)=>{
        let ous = data.organisationUnits.map((organisationUnit) => {
          return organisationUnit.id;
        }).join(';');

        analyticsProcessor
          .setPeriod('2016')
          .setOrgUnit(ous);
      }));
    return analytics.get().then((results) => {
      expect(results.headers !== undefined).to.be.equal(true);
      expect(results.rows !== undefined).to.be.equal(true);
      expect(results.height !== undefined).to.be.equal(true);
      expect(results.width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
});

describe('Given an initial instance (Multiple Process Test)', () => {
  it('should return promise with multiple results (Multiple Post Processing)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

    let multiProcesses = new Fn.MultiFetcher([orgunitProcessor, analytics]);
    return multiProcesses.get().then((results) => {
      expect(results.length).to.be.equal(2);
      expect(results[0].organisationUnits !== undefined).to.be.equal(true);
      expect(results[1].headers !== undefined).to.be.equal(true);
      expect(results[1].rows !== undefined).to.be.equal(true);
      expect(results[1].height !== undefined).to.be.equal(true);
      expect(results[1].width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
  it('should return promise with multiple results with post processing (Multiple Post Processing)', () => {
    let orgunitProcessor = new Fn.OrganisationUnit();

    orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

    let analytics = new Fn.Analytics();

    analytics
      .setPeriod('2016')
      .setOrgUnit('Rp268JB6Ne4;Rp268JB6Ne2');

    let multiProcesses = new Fn.MultiFetcher([orgunitProcessor, analytics]);
    multiProcesses.postProcess((res) => {
      return [res[1], res[0]];
    });
    return multiProcesses.get().then((results) => {
      expect(results.length).to.be.equal(2);
      expect(results[1].organisationUnits !== undefined).to.be.equal(true);
      expect(results[0].headers !== undefined).to.be.equal(true);
      expect(results[0].rows !== undefined).to.be.equal(true);
      expect(results[0].height !== undefined).to.be.equal(true);
      expect(results[0].width !== undefined).to.be.equal(true);
    });
  }).timeout(5000);
});
