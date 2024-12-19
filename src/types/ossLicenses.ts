import typia from "typia";

type OSSLicenses = Array<{
    name: string;
    version?: string;
    repository: string;
    source?: string;
    license: string;
    licenseText: string;
}>;

const isOSSLicenses = typia.createIs<OSSLicenses>();

export { type OSSLicenses, isOSSLicenses };
