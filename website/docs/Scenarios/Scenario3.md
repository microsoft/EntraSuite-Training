---
sidebar_position: 7
title: Govern internet access based on business needs
---

# Govern internet access based on business needs

> Secure and governed access to all applications and resources

## Introduction

In this guide, we describe how to configure Microsoft Entra Suite products for a scenario in which the fictional organization, Contoso has strict default internet access policies and wants to control internet access according to business requirements.

In an example scenario for which we describe how to configure its solution in this guide, a Marketing department user requires access to social networking sites that Contoso prohibits for all users. Users can request access in [My Access](https://learn.microsoft.com/en-us/entra/id-governance/my-access-portal-overview). Upon approval, they become a member of a group that grants them access to social networking sites.

In another example scenario and corresponding solution, a SOC analyst needs to access a group of high-risk internet destinations for a specific time to investigate an incident. The SOC analyst can make that request in My Access. Upon approval, they become a member of a group that grants them access to high-risk internet destinations. 

You can replicate these high-level steps for the Contoso solution as described in this guide.

1. Sign up for Microsoft Entra Suite. Enable and configure Microsoft Entra Internet Access for desired network and security settings.

2. Deploy [Microsoft Global Secure Access clients](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-clients) on users� devices. Enable Microsoft Entra Internet Access.

3. Create a security profile and web content filtering policies with a restrictive baseline policy that blocks specific web categories and web destinations for all users.

4. Create a security profile and web content filtering policies that allows access to social networking sites.

5. Create a security profile that enables the Hacking web category. 

6. Use [Microsoft Entra ID Governance](https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview) to allow users requesting access to access packages such as: 
    * Marketing department users can request access to social networking sites with a quarterly access review. 
    * SOC team members can request access to high-risk internet destinations with a time limit of eight hours.
7. Create and link two [Conditional Access policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access) using the Global Secure Access security profile session control. Scope the policy to groups of users for enforcement.
8. Confirm that traffic is appropriately granted with traffic logs in Global Secure Access. Ensure that Marketing department users can access the access package in the My Access portal.
These are the benefits of using these solutions together:
    * **Least privilege access to internet destinations**. Reduce internet resource access to only what the user requires for their job role through the joiner/mover/leaver cycle. This approach reduces end user and device compromise risk.
    * **Simplified and unified management**. Manage network and security functions from a single cloud-based console, reducing complexity and cost of maintaining multiple solutions and appliances.
    * **Enhanced security and visibility**. Enforce granular and adaptive access policies based on user and device identity and context, as well as app and data sensitivity and location. Enriched logs and analytics provide gain insights into network and security posture to more quickly detect and respond to threats. 
    * **Improved user experience and productivity**. Provide fast and seamless access to necessary apps and resources without compromising security or performance

## Requirements
This section defines the requirements for the scenario solution.

### Permissions

Administrators who interact with Global Secure Access preview features require the Global Secure Access Administrator and Application Administrator roles.

Conditional Access (CA) policy configuration requires the Conditional Access Administrator or Security Administrator role. Some features may require additional roles.

Identity Governance configuration requires at least the Identity Governance Administrator role.

### Licenses
To implement all the steps in this scenario, you need Microsoft Entra ID P1 for Global Secure Access (while the product is in Public Preview) and Microsoft Entra Governance licenses. You can [purchase licenses or obtain trial licenses](https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing).

### Users and devices prerequisites
To successfully deploy and test this scenario, configure for these prerequisites:

1.	Microsoft Entra tenant with Microsoft Entra ID P1 license. Configure Microsoft Entra ID P2 to test Identity Protection. Purchase licenses or obtain trial licenses.
    * One user with at least Global Secure Access Administrator and Application Administrator roles to configure Microsoft's Security Service Edge
    * At least one user as client test user in your tenant
2.	One Windows client device with this configuration:
    * Windows 10/11 64-bit version
    * Microsoft Entra joined or hybrid joined
    * Internet connected
3.	Download and install Global Secure Access Client on client device. The [Global Secure Access Client for Windows](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client) article describes prerequisites and installation.

## Configure Global Secure Access
In this section, we activate Global Secure Access through the Microsoft Entra admin center. We then set up the required initial configurations for the scenario.

1.	Sign in to the Microsoft Entra admin center with at least a Global Administrator role.
2.	Go to **Global Secure Access > Get started > Activate Global Secure Access in your tenant**. Select **Activate** to enable SSE features.
    ![imagen 1](../images/IA-01.png)
3.	Go to **Global Secure Access > Connect > Traffic forwarding**. Toggle on Private access profile. Traffic forwarding enables you to configure the type of network traffic to tunnel through Microsoft�s Security Service Edge Solution services. Set up [traffic forwarding profiles](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-traffic-forwarding) to manage traffic types. 
    * The **Microsoft access profile** is for Microsoft 365 access. 
    * The **Private access profile** is for Microsoft Entra Private Access. 
    * The **Internet access profile** is for Microsoft Entra Internet Access. Microsoft's Security Service Edge solution only captures traffic on client devices with Global Secure Access Client installation.
    ![imagen 2](../images/IA-02.png)

## Install Global Secure Access client
Microsoft Entra Internet Access for Microsoft 365 and Microsoft Entra Private Access use the Global Secure Access client on Windows devices. This client acquires and forwards network traffic to Microsoft's Security Service Edge solution. Perform these installation and configuration steps:

1.	Ensure that the Windows device is Microsoft Entra joined or hybrid joined.
2.	Sign in to the Windows device with a Microsoft Entra user role with local admin privileges.
3.	Sign in to the Microsoft Entra admin center with at least a Global Administrator role.
4.	Go to **Global Secure Access** > Connect > Client Download. Select Download client. Complete the installation.
    ![imagen 3](../images/IA-03.png)

5.	In the Window taskbar, the Global Secure Access Client first appears as disconnected. After a few seconds, when prompted for credentials, enter test user's credentials.
6.	In the Window taskbar, hover over the Global Secure Access Client icon and verify **Connected** status.

## Create security groups
In this guide, we use two security groups to assign security profiles using Conditional Access (CA) policies. In the Microsoft Entra Portal, create security groups with these names:
1.	Internet Access � Allow Social Networking sites
2.	Internet Access � Allow Hacking sites
Don�t add any members to these groups. Later in this guide, we configure Identity Governance to add members on request.

## Block access with baseline profile
In this section, we block access to inappropriate sites for all users in the organization with a baseline profile.

Create a web filtering policy
1.	Sign in to the Microsoft Entra admin center. Go to **Global Secure Access** > Secure > Web content filtering policies > Create policy > [Configure Global Secure Access content filtering](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-web-content-filtering).
 
    ![imagen 4](../images/IA-04.png)
2.	On **Create a web content filtering policy > Basics**, complete these fields:
    * **Name:** Baseline Internet Access Block Rule
    * **Description:** Add a description
    * **Action:** Block
    
    ![imagen 5](../images/IA-05.png)
3.	Select **Next**.
4.	On **Create a web content filtering policy > Policy Rules**, select **Add Rule**.

    ![imagen 6](../images/IA-06.png)
5.	In Add Rule, complete these fields:
    * **Name:** Baseline blocked web categories
    * **Destination type:** webCategory
6.	**Search:** Select the following categories. Confirm that they are in **Selected items**.
    * Alcohol and Tobacco
    * Criminal Activity
    * Gambling
    * Hacking
    * Illegal Software
    * Social Networking
    
    ![imagen 7](../images/IA-07.png)
    
7.	Select **Add**.
8.	On **Create a web content filtering policy > Policy Rules**, confirm your selections.

    ![imagen 8](../images/IA-08.png)
9.	Select **Next**.
10.	On **Create a web content filtering policy > Review**, confirm your policy configuration.
11.	Select **Create policy**.

    ![imagen 9](../images/IA-09.png)

12.	To confirm policy creation, view it in **Manage web content filtering policies**.


## Configure baseline security profile
1.	Sign in to the Microsoft Entra admin center. Go to **Global Secure Access > Secure > Security profiles**. 
2.	Select **Baseline Profile**.
3.	On **Basics**, set **State** to enabled. 
4.	Select **Save**.
5.	On **Edit Baseline Profile**, select **Link policies**. Select **Link a policy**. Select **Existing policy**. Complete these fields:
    * **Link a policy:** Select Policy name and Baseline Internet Access Block Rule
    * **Priority:** 100
    * **State:** Enabled
6.	Select **Add**.
7.	On **Create a profile > Link policies**, confirm **Baseline Internet Access Block Rule** is listed.
8.	Close the baseline security profile.

## Allow access to social networking sites
In this section, we create a security profile that allows access to social networking sites for users that request it.
### Create web filtering policy
1.	Sign in to the Microsoft Entra admin center. Go to **Global Secure Access > Secure > Web content filtering policies > Create policy >** [Configure Global Secure Access content filtering](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-web-content-filtering).

    ![imagen 10](../images/IA-10.png)

2.	On **Create a web content filtering policy > Basics**, complete these fields:
    * **Name:** Allow Social Networking sites
    * **Description:** Add a description
    * **Action:** Allow
3.	Select **Next**.
4.	On **Create a web content filtering policy > Policy Rules**, select **Add Rule**.
5.	In **Add Rule**, complete these fields:
    * **Name:** Social networking
    * **Destination type:** webCategory
    * **Search:** Social
6.	Select **Social Networking**
7.	Select **Add**.
8.	On **Create a web content filtering policy > Policy Rules**, select **Next**.
9.	On **Create a web content filtering policy > Review**, confirm your policy configuration.

    ![imagen 11](../images/IA-11.png)

10.	Select **Create policy**.
11.	To confirm policy creation, view it in **Manage web content filtering policies**.
## Create security policy profile
1.	Sign in to the Microsoft Entra admin center. Go to **Global Secure Access> Secure > Security profiles**. Select **Create profile**.

     ![imagen 12](../images/IA-12.png)

2.	On **Create a profile > Basics**, complete these fields:
    * **Profile name:** Allow Social Networking sites
    * **Description:** Add a description
    * **State:** Enabled
    * **Priority:** 1000
3.	Select **Next**.
4.	On **Create a profile > Link policies**, select **Link a policy**.
5.	Select **Existing policy**.
6.	In **Link a policy**, complete these fields:
    * **Policy name:** Allow Social Networking
    * **Priority:** 1000
    * **State:** Enabled
7.	Select **Add**.
8.	On **Create a profile > Link policies**, confirm **Allow Social Networking** is listed.
9.	Select **Next**.
10.	On **Create a profile > Review**, confirm your profile configuration.

    ![imagen 13](../images/IA-13.png)

11.	Select **Create a profile**.

    ![imagen 14](../images/IA-14.png)

## Create CA policy
In this section, we create a Conditional Access (CA) policy that enforces the **Allow Social Networking** security profile for users that have requested access.

1.	Sign in to the Microsoft Entra admin center. Go to **Protection > Conditional Access**. Select **Create new policy**.
2.	In **New Conditional Access Policy**, complete these fields:
    * **Name:** Internet Access � Allow Social Networking sites
    * **Users or workload identities:** Specific users included
    * **What does this policy apply to?** Users and groups
    * **Include > Select users and groups >** Select **Users and groups**
3.	Select your test group (such as *Internet Access � Allow Social Networking sites*). Select **Select**.
4.	Target resources
    * **Select what this policy applies to > Global Secure Access**
    * **Select the traffic profiles this policy applies to > Internet traffic**
5.	Leave **Grant** at its default settings to grant access so that your defined security profile defines block functionality.
6.	In **Session**, select Use **Global Secure Access security profile**.
7.	Select **Allow Social Networking sites**.
8.	In **Conditional Access Overview > Enable policy**, select **On**. Select **Create**. 

## Allow access to hacking sites
In this section, we create a new security profile that allows access to hacking sites for users that request it. Users receive access for eight hours after which access is automatically removed.

### Create web filtering policy
1.	Sign in to the Microsoft Entra admin center. Go to **Global Secure Access > Secure > Web content filtering policies > Create policy >** [Configure Global Secure Access content filtering](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-web-content-filtering).

    ![imagen 15](../images/IA-15.png)

2.	On **Create a web content filtering policy > Basics**, complete these fields:
    * **Name:** Allow Hacking sites
    * **Description:** Add a description
    * **Action:** Allow
3.	Select **Next**.
4.	On **Create a web content filtering policy > Policy Rules**, select **Add Rule**.
5.	In **Add Rule**, complete these fields:
    * **Name:** Hacking
    * **Destination type:** webCategory
    * **Search: Hacking**, select Hacking
6.	Select **Add

7.	On **Create a web content filtering policy > Policy Rules**, select **Next**.
8.	On **Create a web content filtering policy > Review**, confirm your policy configuration.

    ![imagen 16](../images/IA-16.png)

9.	Select **Create policy**.
10.	To confirm policy creation, view it in **Manage web content filtering policies**.

    ![imagen 17](../images/IA-17.png)

## Create security policy profile
1.	Sign in to the Microsoft Entra admin center. Go to **Global Secure Access > Secure > Security profiles**. Select **Create profile**.

    ![imagen 18](../images/IA-18.png)

2.	On **Create a profile > Basics**, complete these fields:
    * **Profile name:** Allow Hacking sites
    * **Description:** Add a description
    * **State:** Enabled
    * **Priority:** 2000
3.	Select **Next**.
4.	On **Create a profile > Link policies**, select **Link a policy**.
5.	Select **Existing policy**.
6.	In the **Link a policy** dialog box, complete these fields:
    * **Policy name:** Allow Hacking
    * **Priority:** 2000
    * **State:** Enabled
7.	Select **Add**.
8.	On **Create a profile > Link policies**, confirm **Allow Hacking** is listed.
9.	Select **Next**.
10.	On **Create a profile > Review**, confirm your profile configuration.

    ![imagen 19](../images/IA-19.png)

11.	Select **Create a profile**.

## Create CA policy
In this section, we create a Conditional Access (CA) policy that enforces the **Allow Hacking sites** security profile for the users that have requested access.

1.	Sign in to the Microsoft Entra admin center. Go to **Protection > Conditional Access**. Select **Create new policy**.
2.	In the **New Conditional Access Policy** dialog box, complete these fields:
    * **Name: Internet Access � Allow Hacking sites**
    * **Users or workload identities: Specific users included**
    * **What does this policy apply to? Users and groups**
3.	**Include > Select users and groups** > Select **Users and groups**
4.	Select your test group (such as *Internet Access � Allow Hacking sites*) > select **Select**.
5.	**Target resources**
    * Select what this policy applies to > **Global Secure Access**
    * Select the traffic profiles this policy applies to > **Internet traffic**
7.	Leave **Grant** at its default settings to grant access so that your defined security profile defines block functionality.
7.	In the **Session** dialog box, select Use **Global Secure Access security profile**.
8.	Select **Allow Hacking sites**.
9.	In **Conditional Access Overview > Enable policy**, select **On**. Select **Create**.

## Configure access governance
Follow these steps to create an Entitlement management catalog:
1.	Sign in to the **Microsoft Entra admin center** as at least an **Identity Governance Administrator**.
2.	Browse to **Identity governance > Entitlement management > Catalogs**.
3.	Select **New catalog**

    ![imagen 20](../images/IA-20.png)

4.	Enter a unique name for the catalog and provide a description. Requestors see this information in an access package's details (for example, *Internet Access*).
5.	For this scenario, we create access packages in the catalog for internal users. Set **Enabled for external users** to **No**.

    ![imagen 21](../images/IA-21.png)

6.	To add the resources, go to **Catalogs** and open the catalog to which you want to add resources. Select **Resources**. Select **Add resources**.
7.	Add the two security groups that you previously created earlier (such as *Internet Access � Allow Social Networking sites and Internet Access � Allow Hacking sites*).

    ![imagen 22](../images/IA-22.png)

## Create access packages
In this section, we create access packages that allow users to request access to the internet site categories that each security profile defines. Follow these steps to create an access package in Entitlement management:

1.	Sign in to the Microsoft Entra admin center with at least an Identity Governance Administrator role.
2.	Go to **Identity governance > Entitlement management > Access package**.
3.	Select **New access package**.
4.	For **Basics**, give the access package a name (such as *Internet Access � Allow Social Networking sites*). Specify the catalog that you previously created.
5.	For **Resource roles**, select the security that you previously added (such as Internet Access � Allow Social Networking sites).
6.	In **Role**, select **Member**.
7.	For **Requests**, select **For users in your directory**.
8.	To scope the users that can request access to social networking sites, select **Specific users and groups** and add an appropriate group of users. Otherwise, select **All members**.
9.	On **Requests**, select **Yes** for **Enable new requests**.
10.	**Optional:** In **Approval**, specify whether approval is required when users request this access package.
11.	For **Lifecycle**, specify when a user's assignment to the access package expires. Specify whether users can extend their assignments. For **Expiration**, set **Access package assignments expiration** to **On date, Number of days, Number of hours**, or **Never**.

    ![imagen 23](../images/IA-23.png)

12.	Repeat the steps to create a new access package that allows access to hacking sites. Configure these settings:
    * **Resource:** Internet Access � Allow Hacking sites
    * **Who can request:** SOC team members
    * **Lifecycle:** Set Number of hours to 8 hours


## Test user access
In this section, we validate that the user can�t access sites that the baseline profile blocks.

1.	Sign in to the device where you have installed the Global Secure Access client.
2.	In a browser, go to sites that the baseline profile blocks and verify blocked access. For example:
    * hackthissite.org is a free, safe, and legal training ground for security professionals to test and expand ethical hacking skills. This site is classified as Hacking.
    * YouTube.com is a free video sharing platform. This site is classified as Social Networking.

    ![imagen 24](../images/IA-24.png)

## Request social networking access
In this section, we validate that a Marketing department user can request access to social networking sites.
1.	Sign in to the device where you have installed the Global Secure Access client with a user that is a member of the Marketing team (or a user that has authorization to request access to the example Internet Access � Allow Social Networking sites access package).
2.	In a browser, validate blocked access to a site in the Social Networking category that the baseline security profile blocks. For example, try accessing youtube.com.

    ![imagen 25](../images/IA-25.png)

3.	Browse to https://myaccess.microsoft.com. Select **Access packages**. Select **Request** for the *Internet Access � Allow Social Networking sites* access package. 

    ![imagen 26](../images/IA-26.png)

4.	Select **Continue**. Select **Request**.
5.	If you configured approval for the access package, sign in as an approver. Browse to https://myaccess.microsoft.com. Approve the request.
6.	Sign in as a Marketing department user. Browse to https://myaccess.microsoft.com. Select **Request history**. Validate your request status to Internet Access � Allow Social Networking sites is Delivered.
7.	New settings may take a few minutes to apply. To speed up the process, right-click the Global Secure Access icon in the system tray. Select **Log in as a different user**. Sign in again.
8.	Try accessing sites in the social networking category that the baseline security profile blocks. Validate that you can successfully browse them. For example, try browsing youtube.com.

    ![imagen 27](../images/IA-27.png)


## Request hacking site access
In this section, we validate that a SOC team user can request access to hacking sites.

1.	Sign in to the device where you have installed the Global Secure Access client with a user that is a member of the SOC team (or a user that has authorization to request access to the example Internet Access � Allow Hacking sites access package).
2.	In a browser, validate blocked access to a site in the hacking category that the baseline security profile blocks. For example, hackthissite.org.
   
    ![imagen 28](../images/IA-28.png)

3.	Browse to https://myaccess.microsoft.com. Select **Access packages**. Select **Request** for the *Internet Access � Allow Hacking sites* access package.
4.	Select **Continue**. Select **Request**.
5.	If you configured approval for the access package, sign in as an approver. Browse to https://myaccess.microsoft.com. Approve the request.
6.	Sign in as a SOC team user. Browse to https://myaccess.microsoft.com. Select **Request history**. Validate your request status to Internet Access � Allow Hacking sites is **Delivered**.
7.	New settings may take a few minutes to apply. To speed up the process, right-click the Global Secure Access icon in the system tray. Select **Log in as a different user**. Sign in again.
8.	Try accessing sites in the hacking category that the baseline security profile blocks. Validate that you can successfully browse them. For example, try browsing hackthissite.org.

    ![imagen 29](../images/IA-29.png)

9.	If you configured hacking site access with **Lifecycle > Number of hours** set to 8 in previous steps, after eight hours elapses, verify blocked access to hacking sites.

## Resources
* [Learn about Microsoft Entra ID Governance](https://learn.microsoft.com/en-us/entra/id-governance/identity-governance-overview)
* [Plan a Microsoft Entra Conditional Access deployment](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access)
* [Learn about Microsoft Entra Internet Access](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access)
* [Learn about the Global Secure Access clients for Microsoft Entra Private Access and Microsoft Entra Internet Access](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-clients)




























